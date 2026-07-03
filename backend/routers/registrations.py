from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models.registration import SessionRegistration, CourseRegistration
from schemas.registration import (
    SessionRegistrationCreate,
    SessionRegistrationResponse,
    CourseRegistrationCreate,
    CourseRegistrationResponse
)
from utils.dependencies import get_current_user
from models.user import User
from fastapi.security import OAuth2PasswordBearer
from utils.auth import decode_token

router = APIRouter(tags=["registrations"])

# Optional auth setup: if user is logged in, attach their user_id
oauth2_scheme_opt = OAuth2PasswordBearer(tokenUrl="/ymsapi/login/", auto_error=False)

def get_optional_user(token: str | None = Depends(oauth2_scheme_opt), db: Session = Depends(get_db)) -> User | None:
    if not token:
        return None
    payload = decode_token(token)
    username = payload.get("sub")
    if not username:
        return None
    return db.query(User).filter(User.username == username).first()

@router.post("/session-registration/", response_model=SessionRegistrationResponse, status_code=status.HTTP_201_CREATED)
def create_session_registration(
    reg_in: SessionRegistrationCreate,
    current_user: User | None = Depends(get_optional_user),
    db: Session = Depends(get_db)
):
    new_reg = SessionRegistration(
        user_id=current_user.id if current_user else None,
        name=reg_in.name,
        dob=reg_in.date_of_birth,
        email=reg_in.email,
        phone=reg_in.phone,
        gender=reg_in.gender,
        address=reg_in.address,
        city=reg_in.city,
        postal_code=reg_in.postal_zip_code,
        country=reg_in.country,
        batch_time=reg_in.batch_time,
        payment_status="pending"
    )
    db.add(new_reg)
    db.commit()
    db.refresh(new_reg)
    return new_reg

@router.post("/course-registration/", response_model=CourseRegistrationResponse, status_code=status.HTTP_201_CREATED)
def create_course_registration(
    reg_in: CourseRegistrationCreate,
    current_user: User | None = Depends(get_optional_user),
    db: Session = Depends(get_db)
):
    new_reg = CourseRegistration(
        user_id=current_user.id if current_user else None,
        name=reg_in.name,
        dob=reg_in.date_of_birth,
        email=reg_in.email,
        phone=reg_in.phone,
        gender=reg_in.gender,
        address=reg_in.address,
        city=reg_in.city,
        postal_code=reg_in.postal_zip_code,
        country=reg_in.country,
        course_code=reg_in.course_code,
        course_name=reg_in.course_name,
        payment_status="pending"
    )
    db.add(new_reg)
    db.commit()
    db.refresh(new_reg)
    return new_reg
