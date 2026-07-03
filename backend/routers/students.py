from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
from database import get_db
from models.student import Student
from schemas.student import StudentCreate, StudentUpdate, StudentResponse
from utils.dependencies import get_admin_user
from typing import List, Optional

router = APIRouter(tags=["students"])

@router.get("/stu_list/", response_model=List[StudentResponse])
def list_students_public(db: Session = Depends(get_db)):
    # Matches the exact endpoint the React frontend calls in Admin.jsx
    return db.query(Student).all()

@router.get("/students/", response_model=List[StudentResponse])
def list_students_admin(
    fees_status: Optional[str] = None,
    current_admin: Student = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    query = db.query(Student)
    if fees_status:
        query = query.filter(Student.fees_status == fees_status)
    return query.all()

@router.post("/students/", response_model=StudentResponse, status_code=status.HTTP_201_CREATED)
def create_student(
    student_in: StudentCreate,
    current_admin: Student = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    new_student = Student(**student_in.model_dump())
    db.add(new_student)
    db.commit()
    db.refresh(new_student)
    return new_student

@router.put("/students/{student_id}/", response_model=StudentResponse)
def update_student(
    student_id: int,
    student_in: StudentUpdate,
    current_admin: Student = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Student not found"
        )
    
    update_data = student_in.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(student, key, value)
        
    db.commit()
    db.refresh(student)
    return student

@router.delete("/students/{student_id}/", status_code=status.HTTP_204_NO_CONTENT)
def delete_student(
    student_id: int,
    current_admin: Student = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Student not found"
        )
        
    db.delete(student)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
