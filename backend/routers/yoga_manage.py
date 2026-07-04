from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models.yoga_session import YogaSession
from models.yoga_course import YogaCourse
from schemas.yoga_manage import (
    YogaSessionCreate, YogaSessionUpdate, YogaSessionResponse,
    YogaCourseCreate, YogaCourseUpdate, YogaCourseResponse
)
from utils.dependencies import get_admin_user
from models.user import User

router = APIRouter(tags=["yoga-management"])

# ── YogaSession CRUD ──

@router.get("/sessions/", response_model=List[YogaSessionResponse])
def get_sessions(db: Session = Depends(get_db)):
    return db.query(YogaSession).all()

@router.get("/sessions/{session_id}/", response_model=YogaSessionResponse)
def get_session(session_id: int, db: Session = Depends(get_db)):
    session = db.query(YogaSession).filter(YogaSession.id == session_id).first()
    if not session:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Session not found")
    return session

@router.post("/sessions/", response_model=YogaSessionResponse, status_code=status.HTTP_201_CREATED)
def create_session(
    data: YogaSessionCreate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user)
):
    # Check if slot_time already exists
    existing = db.query(YogaSession).filter(YogaSession.slot_time == data.slot_time).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="A session with this slot time already exists")

    session = YogaSession(
        name=data.name,
        slot_time=data.slot_time,
        description=data.description,
        max_capacity=data.max_capacity,
        is_active=data.is_active
    )
    db.add(session)
    db.commit()
    db.refresh(session)
    return session

@router.put("/sessions/{session_id}/", response_model=YogaSessionResponse)
def update_session(
    session_id: int,
    data: YogaSessionUpdate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user)
):
    session = db.query(YogaSession).filter(YogaSession.id == session_id).first()
    if not session:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Session not found")

    update_data = data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(session, key, value)

    db.commit()
    db.refresh(session)
    return session

@router.delete("/sessions/{session_id}/", status_code=status.HTTP_200_OK)
def delete_session(
    session_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user)
):
    session = db.query(YogaSession).filter(YogaSession.id == session_id).first()
    if not session:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Session not found")
    db.delete(session)
    db.commit()
    return {"message": "Session deleted successfully"}

# ── YogaCourse CRUD ──

@router.get("/courses/", response_model=List[YogaCourseResponse])
def get_courses(db: Session = Depends(get_db)):
    return db.query(YogaCourse).all()

@router.get("/courses/{course_id}/", response_model=YogaCourseResponse)
def get_course(course_id: int, db: Session = Depends(get_db)):
    course = db.query(YogaCourse).filter(YogaCourse.id == course_id).first()
    if not course:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Course not found")
    return course

@router.post("/courses/", response_model=YogaCourseResponse, status_code=status.HTTP_201_CREATED)
def create_course(
    data: YogaCourseCreate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user)
):
    existing = db.query(YogaCourse).filter(YogaCourse.code == data.code).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="A course with this code already exists")

    course = YogaCourse(
        code=data.code,
        name=data.name,
        description=data.description,
        duration=data.duration,
        fee=data.fee,
        is_active=data.is_active
    )
    db.add(course)
    db.commit()
    db.refresh(course)
    return course

@router.put("/courses/{course_id}/", response_model=YogaCourseResponse)
def update_course(
    course_id: int,
    data: YogaCourseUpdate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user)
):
    course = db.query(YogaCourse).filter(YogaCourse.id == course_id).first()
    if not course:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Course not found")

    update_data = data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(course, key, value)

    db.commit()
    db.refresh(course)
    return course

@router.delete("/courses/{course_id}/", status_code=status.HTTP_200_OK)
def delete_course(
    course_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user)
):
    course = db.query(YogaCourse).filter(YogaCourse.id == course_id).first()
    if not course:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Course not found")
    db.delete(course)
    db.commit()
    return {"message": "Course deleted successfully"}
