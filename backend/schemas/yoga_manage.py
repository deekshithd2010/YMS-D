from pydantic import BaseModel
from typing import Optional
from datetime import datetime

# ── YogaSession Schemas ──

class YogaSessionCreate(BaseModel):
    name: str
    slot_time: str
    description: Optional[str] = None
    max_capacity: int = 30
    is_active: bool = True

class YogaSessionUpdate(BaseModel):
    name: Optional[str] = None
    slot_time: Optional[str] = None
    description: Optional[str] = None
    max_capacity: Optional[int] = None
    is_active: Optional[bool] = None

class YogaSessionResponse(BaseModel):
    id: int
    name: str
    slot_time: str
    description: Optional[str] = None
    max_capacity: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

# ── YogaCourse Schemas ──

class YogaCourseCreate(BaseModel):
    code: str
    name: str
    description: Optional[str] = None
    duration: Optional[str] = None
    fee: Optional[float] = None
    is_active: bool = True

class YogaCourseUpdate(BaseModel):
    code: Optional[str] = None
    name: Optional[str] = None
    description: Optional[str] = None
    duration: Optional[str] = None
    fee: Optional[float] = None
    is_active: Optional[bool] = None

class YogaCourseResponse(BaseModel):
    id: int
    code: str
    name: str
    description: Optional[str] = None
    duration: Optional[str] = None
    fee: Optional[float] = None
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True
