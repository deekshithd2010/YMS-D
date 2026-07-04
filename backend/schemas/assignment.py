from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class AssignmentCreate(BaseModel):
    teacher_id: int
    assignment_type: str
    assignment_value: str

class AssignmentResponse(BaseModel):
    id: int
    teacher_id: int
    assignment_type: str
    assignment_value: str
    teacher_name: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True
