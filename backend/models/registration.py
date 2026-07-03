from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime, timezone
from database import Base

class SessionRegistration(Base):
    __tablename__ = "session_registrations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    name = Column(String(100), nullable=False)
    dob = Column(String(20), nullable=True)
    email = Column(String(100), nullable=False)
    phone = Column(String(20), nullable=True)
    gender = Column(String(10), nullable=True)
    address = Column(String(255), nullable=True)
    city = Column(String(50), nullable=True)
    postal_code = Column(String(10), nullable=True)
    country = Column(String(50), nullable=True)
    batch_time = Column(String(50), nullable=False)
    payment_status = Column(String(20), default="pending")  # 'paid' or 'pending'
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

class CourseRegistration(Base):
    __tablename__ = "course_registrations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    name = Column(String(100), nullable=False)
    dob = Column(String(20), nullable=True)
    email = Column(String(100), nullable=False)
    phone = Column(String(20), nullable=True)
    gender = Column(String(10), nullable=True)
    address = Column(String(255), nullable=True)
    city = Column(String(50), nullable=True)
    postal_code = Column(String(10), nullable=True)
    country = Column(String(50), nullable=True)
    course_code = Column(String(20), nullable=False)
    course_name = Column(String(100), nullable=False)
    payment_status = Column(String(20), default="pending")  # 'paid' or 'pending'
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
