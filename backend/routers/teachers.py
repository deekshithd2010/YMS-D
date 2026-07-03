from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
from database import get_db
from models.teacher import Teacher
from schemas.teacher import TeacherCreate, TeacherUpdate, TeacherResponse
from utils.dependencies import get_admin_user
from typing import List

router = APIRouter(tags=["teachers"])

@router.get("/teachers/", response_model=List[TeacherResponse])
def list_teachers(db: Session = Depends(get_db)):
    return db.query(Teacher).all()

@router.post("/teachers/", response_model=TeacherResponse, status_code=status.HTTP_201_CREATED)
def create_teacher(
    teacher_in: TeacherCreate,
    current_admin: Teacher = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    new_teacher = Teacher(**teacher_in.model_dump())
    db.add(new_teacher)
    db.commit()
    db.refresh(new_teacher)
    return new_teacher

@router.put("/teachers/{teacher_id}/", response_model=TeacherResponse)
def update_teacher(
    teacher_id: int,
    teacher_in: TeacherUpdate,
    current_admin: Teacher = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    teacher = db.query(Teacher).filter(Teacher.id == teacher_id).first()
    if not teacher:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Teacher not found"
        )
    
    update_data = teacher_in.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(teacher, key, value)
        
    db.commit()
    db.refresh(teacher)
    return teacher

@router.delete("/teachers/{teacher_id}/", status_code=status.HTTP_204_NO_CONTENT)
def delete_teacher(
    teacher_id: int,
    current_admin: Teacher = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    teacher = db.query(Teacher).filter(Teacher.id == teacher_id).first()
    if not teacher:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Teacher not found"
        )
        
    db.delete(teacher)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
