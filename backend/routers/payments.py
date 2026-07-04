import secrets
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models.payment import Payment
from models.registration import SessionRegistration, CourseRegistration
from schemas.payment import PaymentOrderCreate, PaymentVerify, PaymentResponse
from utils.dependencies import get_current_user
from models.user import User

router = APIRouter(prefix="/payments", tags=["payments"])

@router.post("/create-order/", response_model=PaymentResponse, status_code=status.HTTP_201_CREATED)
def create_payment_order(
    order_data: PaymentOrderCreate,
    db: Session = Depends(get_db)
):
    # Check if the registration exists
    if order_data.registration_type == "session":
        reg = db.query(SessionRegistration).filter(SessionRegistration.id == order_data.registration_id).first()
    elif order_data.registration_type == "course":
        reg = db.query(CourseRegistration).filter(CourseRegistration.id == order_data.registration_id).first()
    else:
        raise HTTPException(status_code=400, detail="Invalid registration type")

    if not reg:
        raise HTTPException(status_code=404, detail="Registration record not found")

    # Generate mock razorpay order id
    mock_order_id = f"order_{secrets.token_hex(8)}"

    payment = Payment(
        user_id=reg.user_id,
        registration_type=order_data.registration_type,
        registration_id=order_data.registration_id,
        amount=order_data.amount,
        currency=order_data.currency,
        razorpay_order_id=mock_order_id,
        status="pending"
    )

    db.add(payment)
    db.commit()
    db.refresh(payment)
    return payment

@router.post("/verify/", response_model=PaymentResponse)
def verify_payment(
    verify_data: PaymentVerify,
    db: Session = Depends(get_db)
):
    # Find payment record
    payment = db.query(Payment).filter(Payment.razorpay_order_id == verify_data.razorpay_order_id).first()
    if not payment:
        raise HTTPException(status_code=404, detail="Payment order not found")

    # Update payment record with signature and payment id
    payment.razorpay_payment_id = verify_data.razorpay_payment_id
    payment.razorpay_signature = verify_data.razorpay_signature
    payment.status = "completed"

    # Update payment_status on the actual registration
    if payment.registration_type == "session":
        reg = db.query(SessionRegistration).filter(SessionRegistration.id == payment.registration_id).first()
    else:
        reg = db.query(CourseRegistration).filter(CourseRegistration.id == payment.registration_id).first()

    if reg:
        reg.payment_status = "paid"

    db.commit()
    db.refresh(payment)
    return payment
