from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime, timezone
from database import Base

class Teacher(Base):
    __tablename__ = "teachers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), index=True, nullable=False)
    phone = Column(String(20), nullable=True)
    gender = Column(String(10), nullable=True)
    address = Column(String(255), nullable=True)
    city = Column(String(50), nullable=True)
    postal_code = Column(String(10), nullable=True)
    country = Column(String(50), nullable=True)
    role = Column(String(50), nullable=True)  # e.g., 'Session Teacher' or 'Course Teacher'
    role_details = Column(String(100), nullable=True)
    image = Column(String(255), nullable=True)
    social_links = Column(Text, nullable=True)  # Store JSON string containing social profile URLs
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
