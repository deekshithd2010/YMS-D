from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models.user import User
from models.teacher import Teacher
from models.registration import SessionRegistration, CourseRegistration
from models.assignment import InstructorAssignment
from schemas.assignment import AssignmentCreate, AssignmentResponse
from utils.dependencies import get_admin_user
from utils.auth import hash_password
import secrets
from typing import Optional

from pydantic import BaseModel

class AdminCreateUserRequest(BaseModel):
    username: str
    email: str
    password: str
    is_instructor: Optional[bool] = False

class AdminCreateInstructorRequest(BaseModel):
    username: Optional[str] = None
    name: str
    email: str
    phone: Optional[str] = None
    role: Optional[str] = None
    role_details: Optional[str] = None

class UpdatePaymentStatusRequest(BaseModel):
    status: str

router = APIRouter(tags=["admin-dashboard"])

@router.get("/admin/session-bookings/")
def get_session_bookings(
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user)
):
    registrations = db.query(SessionRegistration).all()
    results = []
    for reg in registrations:
        results.append({
            "id": reg.id,
            "user_id": reg.user_id,
            "name": reg.name,
            "email": reg.email,
            "phone": reg.phone,
            "batch_time": reg.batch_time,
            "payment_status": reg.payment_status,
            "created_at": reg.created_at
        })
    return results

@router.get("/admin/course-bookings/")
def get_course_bookings(
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user)
):
    registrations = db.query(CourseRegistration).all()
    results = []
    for reg in registrations:
        results.append({
            "id": reg.id,
            "user_id": reg.user_id,
            "name": reg.name,
            "email": reg.email,
            "phone": reg.phone,
            "course_code": reg.course_code,
            "course_name": reg.course_name,
            "payment_status": reg.payment_status,
            "created_at": reg.created_at
        })
    return results

@router.post("/admin/assign-instructor/", response_model=AssignmentResponse, status_code=status.HTTP_201_CREATED)
def assign_instructor(
    data: AssignmentCreate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user)
):
    # Verify teacher exists
    teacher = db.query(Teacher).filter(Teacher.id == data.teacher_id).first()
    if not teacher:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Teacher not found")

    assignment = InstructorAssignment(
        teacher_id=data.teacher_id,
        assignment_type=data.assignment_type,
        assignment_value=data.assignment_value
    )
    db.add(assignment)
    db.commit()
    db.refresh(assignment)
    return AssignmentResponse(
        id=assignment.id,
        teacher_id=assignment.teacher_id,
        assignment_type=assignment.assignment_type,
        assignment_value=assignment.assignment_value,
        teacher_name=teacher.name,
        created_at=assignment.created_at
    )

@router.delete("/admin/unassign-instructor/{assignment_id}/", status_code=status.HTTP_200_OK)
def unassign_instructor(
    assignment_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user)
):
    assignment = db.query(InstructorAssignment).filter(InstructorAssignment.id == assignment_id).first()
    if not assignment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Assignment not found")
    db.delete(assignment)
    db.commit()
    return {"message": "Instructor unassigned successfully"}

@router.get("/admin/assignments/")
def get_all_assignments(
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user)
):
    assignments = db.query(InstructorAssignment).all()
    results = []
    for a in assignments:
        teacher = db.query(Teacher).filter(Teacher.id == a.teacher_id).first()
        results.append({
            "id": a.id,
            "teacher_id": a.teacher_id,
            "assignment_type": a.assignment_type,
            "assignment_value": a.assignment_value,
            "teacher_name": teacher.name if teacher else None,
            "created_at": a.created_at
        })
    return results

@router.post("/admin/create-user/", status_code=status.HTTP_201_CREATED)
def admin_create_user(
    data: AdminCreateUserRequest,
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user)
):
    # Check if username already exists
    existing = db.query(User).filter(User.username == data.username).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username already exists")

    hashed_pwd = hash_password(data.password)
    new_user = User(
        username=data.username,
        email=data.email,
        hashed_password=hashed_pwd,
        is_instructor=data.is_instructor
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User created successfully", "user_id": new_user.id}

@router.post("/admin/create-instructor/", status_code=status.HTTP_201_CREATED)
def admin_create_instructor(
    data: AdminCreateInstructorRequest,
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user)
):
    # Create teacher record
    teacher = Teacher(
        name=data.name,
        email=data.email,
        phone=data.phone,
        role=data.role,
        role_details=data.role_details
    )
    db.add(teacher)
    db.commit()
    db.refresh(teacher)

    # Generate temp password and create linked user
    temp_password = secrets.token_urlsafe(8)
    hashed_pwd = hash_password(temp_password)
    
    # Use specified username if provided, else email prefix
    if data.username and data.username.strip():
        username = data.username.strip()
    else:
        username = data.email.split("@")[0]

    base_username = username
    counter = 1
    while db.query(User).filter(User.username == username).first():
        username = f"{base_username}{counter}"
        counter += 1

    new_user = User(
        username=username,
        email=data.email,
        hashed_password=hashed_pwd,
        name=data.name,
        is_instructor=True,
        linked_teacher_id=teacher.id
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "username": username,
        "temp_password": temp_password,
        "teacher_id": teacher.id
    }

@router.put("/admin/update-payment-status/{reg_type}/{reg_id}/")
def update_payment_status(
    reg_type: str,
    reg_id: int,
    data: UpdatePaymentStatusRequest,
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user)
):
    if reg_type == "session":
        reg = db.query(SessionRegistration).filter(SessionRegistration.id == reg_id).first()
    elif reg_type == "course":
        reg = db.query(CourseRegistration).filter(CourseRegistration.id == reg_id).first()
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid registration type. Use 'session' or 'course'.")

    if not reg:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Registration not found")

    reg.payment_status = data.status
    db.commit()
    return {"message": f"Payment status updated to '{data.status}'"}
