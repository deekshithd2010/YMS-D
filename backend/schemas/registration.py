from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class SessionRegistrationCreate(BaseModel):
    name: str
    date_of_birth: Optional[str] = None
    email: EmailStr
    phone: Optional[str] = None
    gender: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    postal_zip_code: Optional[str] = None
    country: Optional[str] = None
    batch_time: str

class SessionRegistrationResponse(BaseModel):
    id: int
    user_id: Optional[int] = None
    name: str
    dob: Optional[str] = None
    email: str
    phone: Optional[str] = None
    gender: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    postal_code: Optional[str] = None
    country: Optional[str] = None
    batch_time: str
    payment_status: str
    created_at: datetime

    class Config:
        from_attributes = True

class CourseRegistrationCreate(BaseModel):
    name: str
    date_of_birth: Optional[str] = None
    email: EmailStr
    phone: Optional[str] = None
    gender: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    postal_zip_code: Optional[str] = None
    country: Optional[str] = None
    course_code: str
    course_name: str

class CourseRegistrationResponse(BaseModel):
    id: int
    user_id: Optional[int] = None
    name: str
    dob: Optional[str] = None
    email: str
    phone: Optional[str] = None
    gender: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    postal_code: Optional[str] = None
    country: Optional[str] = None
    course_code: str
    course_name: str
    payment_status: str
    created_at: datetime

    class Config:
        from_attributes = True
