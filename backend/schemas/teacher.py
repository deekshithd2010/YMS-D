from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class TeacherCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    gender: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    postal_code: Optional[str] = None
    country: Optional[str] = None
    role: Optional[str] = None
    role_details: Optional[str] = None
    image: Optional[str] = None
    social_links: Optional[str] = None  # JSON string

class TeacherUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    gender: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    postal_code: Optional[str] = None
    country: Optional[str] = None
    role: Optional[str] = None
    role_details: Optional[str] = None
    image: Optional[str] = None
    social_links: Optional[str] = None

class TeacherResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: Optional[str] = None
    gender: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    postal_code: Optional[str] = None
    country: Optional[str] = None
    role: Optional[str] = None
    role_details: Optional[str] = None
    image: Optional[str] = None
    social_links: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True
