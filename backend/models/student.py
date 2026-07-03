from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime, timezone
from database import Base

class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), index=True, nullable=False)
    phone = Column(String(20), nullable=True)
    gender = Column(String(10), nullable=True)
    address = Column(String(255), nullable=True)
    city = Column(String(50), nullable=True)
    postal_code = Column(String(10), nullable=True)
    country = Column(String(50), nullable=True)
    fees_status = Column(String(20), default="pending")  # 'paid' or 'pending'
    batch_timing = Column(String(50), nullable=True)
    course = Column(String(100), nullable=True)
    subscription_type = Column(String(50), nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
