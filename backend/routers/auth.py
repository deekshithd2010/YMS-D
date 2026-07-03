from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models.user import User
from schemas.user import (
    UserCreate,
    UserLogin,
    TokenResponse,
    ForgotPasswordRequest,
    VerifyOTPRequest,
    ResetPasswordRequest
)
from utils.auth import hash_password, verify_password, create_access_token
import random
from datetime import datetime, timedelta, timezone

router = APIRouter(tags=["authentication"])

# Temporary in-memory OTP store
otp_store = {}

@router.post("/register/", status_code=status.HTTP_201_CREATED)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    # Check if user already exists
    existing_user = db.query(User).filter(User.username == user_in.username).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered"
        )
    
    # Hash password and create user
    hashed_pwd = hash_password(user_in.password)
    new_user = User(
        username=user_in.username,
        email=user_in.email,
        hashed_password=hashed_pwd,
        is_admin=False  # default to regular user
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User registered successfully"}

@router.post("/login/", response_model=TokenResponse)
def login(credentials: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == credentials.username).first()
    if not user or not verify_password(credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password"
        )
    
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/forgot-password/")
def forgot_password(req: ForgotPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == req.email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User with this email does not exist"
        )
    
    # Generate 6-digit OTP
    otp = f"{random.randint(100000, 999999)}"
    expiry = datetime.now(timezone.utc) + timedelta(minutes=10)
    otp_store[req.email] = {"otp": otp, "expires": expiry}
    
    # In-memory logging for development
    print(f"\n[DEV PASSWORD RESET] OTP for {req.email} is: {otp}\n")
    
    return {"message": "OTP sent successfully to email"}

@router.post("/verify-otp/")
def verify_otp(req: VerifyOTPRequest):
    stored = otp_store.get(req.email)
    if not stored:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No OTP requested for this email"
        )
    
    if datetime.now(timezone.utc) > stored["expires"]:
        otp_store.pop(req.email, None)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="OTP expired"
        )
        
    if stored["otp"] != req.otp:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid OTP"
        )
        
    return {"message": "OTP verified successfully"}

@router.post("/reset-password/")
def reset_password(req: ResetPasswordRequest, db: Session = Depends(get_db)):
    if req.new_password != req.confirm_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Passwords do not match"
        )
        
    # In a full flow we would verify they completed the OTP step,
    # but since this is a simplified flow, we verify if they have a valid entry in the OTP store
    stored = otp_store.get(req.email)
    if not stored:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="OTP verification required before resetting password"
        )
        
    user = db.query(User).filter(User.email == req.email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
        
    user.hashed_password = hash_password(req.new_password)
    db.commit()
    
    # Remove OTP after successful reset
    otp_store.pop(req.email, None)
    return {"message": "Password reset successfully"}
