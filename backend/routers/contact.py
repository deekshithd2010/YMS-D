from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models.contact import ContactMessage
from schemas.contact import ContactCreate, ContactResponse
from utils.dependencies import get_admin_user
from typing import List

router = APIRouter(tags=["contact"])

@router.post("/contact/")
def create_contact_message(
    msg_in: ContactCreate,
    db: Session = Depends(get_db)
):
    new_msg = ContactMessage(**msg_in.model_dump())
    db.add(new_msg)
    db.commit()
    db.refresh(new_msg)
    return {"message": "Message sent successfully"}

@router.get("/contact/", response_model=List[ContactResponse])
def list_contact_messages(
    current_admin = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    return db.query(ContactMessage).all()
