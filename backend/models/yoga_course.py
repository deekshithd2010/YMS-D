from sqlalchemy import Column, Integer, String, Text, Boolean, Float, DateTime
from datetime import datetime, timezone
from database import Base

class YogaCourse(Base):
    __tablename__ = "yoga_courses"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String(20), nullable=False, unique=True)
    name = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    duration = Column(String(50), nullable=True)
    fee = Column(Float, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
