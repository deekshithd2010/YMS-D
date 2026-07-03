from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class StudentCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    gender: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    postal_code: Optional[str] = None
    country: Optional[str] = None
    fees_status: Optional[str] = "pending"
    batch_timing: Optional[str] = None
    course: Optional[str] = None
    subscription_type: Optional[str] = None

class StudentUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    gender: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    postal_code: Optional[str] = None
    country: Optional[str] = None
    fees_status: Optional[str] = None
    batch_timing: Optional[str] = None
    course: Optional[str] = None
    subscription_type: Optional[str] = None

class StudentResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: Optional[str] = None
    gender: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    postal_code: Optional[str] = None
    country: Optional[str] = None
    fees_status: str
    batch_timing: Optional[str] = None
    course: Optional[str] = None
    subscription_type: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True
