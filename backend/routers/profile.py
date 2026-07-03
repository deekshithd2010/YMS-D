from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models.user import User
from models.registration import SessionRegistration, CourseRegistration
from schemas.user import UserResponse, UserProfileUpdate
from schemas.registration import SessionRegistrationResponse, CourseRegistrationResponse
from utils.dependencies import get_current_user
from typing import List, Dict, Any

router = APIRouter(tags=["profile"])

@router.get("/profile/", response_model=UserResponse)
def get_profile(current_user: User = Depends(get_current_user)):
    return current_user

@router.put("/profile/", response_model=UserResponse)
def update_profile(
    profile_data: UserProfileUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    update_dict = profile_data.model_dump(exclude_unset=True)
    for key, value in update_dict.items():
        setattr(current_user, key, value)
    
    db.commit()
    db.refresh(current_user)
    return current_user

@router.get("/yoga-profile/", response_model=Dict[str, List[Any]])
def get_yoga_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    sessions = db.query(SessionRegistration).filter(
        SessionRegistration.user_id == current_user.id
    ).all()
    
    courses = db.query(CourseRegistration).filter(
        CourseRegistration.user_id == current_user.id
    ).all()
    
    return {
        "sessions": sessions,
        "courses": courses
    }
