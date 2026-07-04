from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models.user import User
from models.assignment import InstructorAssignment
from models.teacher import Teacher
from models.registration import SessionRegistration, CourseRegistration
from utils.dependencies import get_instructor_user

router = APIRouter(tags=["instructor"])

@router.get("/instructor/my-assignments/")
def get_my_assignments(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_instructor_user)
):
    if not current_user.linked_teacher_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No teacher profile linked to this account"
        )

    assignments = db.query(InstructorAssignment).filter(
        InstructorAssignment.teacher_id == current_user.linked_teacher_id
    ).all()

    teacher = db.query(Teacher).filter(Teacher.id == current_user.linked_teacher_id).first()
    results = []
    for a in assignments:
        results.append({
            "id": a.id,
            "teacher_id": a.teacher_id,
            "assignment_type": a.assignment_type,
            "assignment_value": a.assignment_value,
            "teacher_name": teacher.name if teacher else None,
            "created_at": a.created_at
        })
    return results

@router.get("/instructor/session-students/{batch_time}/")
def get_session_students(
    batch_time: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_instructor_user)
):
    registrations = db.query(SessionRegistration).filter(
        SessionRegistration.batch_time == batch_time
    ).all()

    results = []
    for reg in registrations:
        results.append({
            "id": reg.id,
            "user_id": reg.user_id,
            "name": reg.name,
            "email": reg.email,
            "phone": reg.phone,
            "gender": reg.gender,
            "batch_time": reg.batch_time,
            "payment_status": reg.payment_status,
            "created_at": reg.created_at
        })
    return results

@router.get("/instructor/course-students/{course_code}/")
def get_course_students(
    course_code: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_instructor_user)
):
    registrations = db.query(CourseRegistration).filter(
        CourseRegistration.course_code == course_code
    ).all()

    results = []
    for reg in registrations:
        results.append({
            "id": reg.id,
            "user_id": reg.user_id,
            "name": reg.name,
            "email": reg.email,
            "phone": reg.phone,
            "gender": reg.gender,
            "course_code": reg.course_code,
            "course_name": reg.course_name,
            "payment_status": reg.payment_status,
            "created_at": reg.created_at
        })
    return results
