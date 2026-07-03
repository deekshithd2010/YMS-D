from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models.teacher import Teacher
from typing import List, Dict, Any

router = APIRouter(tags=["instructors"])

# Hardcoded details that match instructors in React frontend
INSTRUCTORS_DATA = [
    {
        "id": 1,
        "name": "Yoga Master Ravi",
        "role": "Session Teacher",
        "role_details": "Hata Yoga",
        "image": "/images/Instructors/Instructors1.png",
        "social_links": '{"instagram": "https://instagram.com", "twitter": "https://twitter.com"}'
    },
    {
        "id": 2,
        "name": "Guru Priya Sharma",
        "role": "Course Teacher",
        "role_details": "PGDYT",
        "image": "/images/Instructors/Instructors2.png",
        "social_links": '{"instagram": "https://instagram.com", "facebook": "https://facebook.com"}'
    },
    {
        "id": 3,
        "name": "Acharya Dev Kumar",
        "role": "Session Teacher",
        "role_details": "Ashtanga Vinyasa",
        "image": "/images/Instructors/Instructors3.png",
        "social_links": '{"instagram": "https://instagram.com"}'
    },
    {
        "id": 4,
        "name": "Dr. Ananya Verma",
        "role": "Course Teacher",
        "role_details": "PGDYEd",
        "image": "/images/Instructors/Instructors4.png",
        "social_links": '{"instagram": "https://instagram.com", "linkedin": "https://linkedin.com"}'
    },
    {
        "id": 5,
        "name": "Swami Krishnananda",
        "role": "Session Teacher",
        "role_details": "Pranayama & Meditation",
        "image": "/images/Instructors/Instructors5.png",
        "social_links": '{}'
    },
    {
        "id": 6,
        "name": "Yogini Lakshmi Devi",
        "role": "Course Teacher",
        "role_details": "YIC",
        "image": "/images/Instructors/Instructors6.png",
        "social_links": '{"instagram": "https://instagram.com"}'
    }
]

@router.get("/instructors/", response_model=List[Dict[str, Any]])
def get_instructors(db: Session = Depends(get_db)):
    # Query database teachers and combine with static ones
    teachers = db.query(Teacher).all()
    results = []
    
    # 1. Add static instructors
    for i in INSTRUCTORS_DATA:
        results.append(i)
        
    # 2. Add dynamically registered teachers from database
    for t in teachers:
        results.append({
            "id": t.id + 100,  # avoid id clashes
            "name": t.name,
            "role": t.role or "Instructor",
            "role_details": t.role_details or "",
            "image": t.image or "/images/Instructors/Photo.png",
            "social_links": t.social_links or "{}"
        })
        
    return results
