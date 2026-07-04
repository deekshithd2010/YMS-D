from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class PaymentOrderCreate(BaseModel):
    registration_type: str
    registration_id: int
    amount: float
    currency: str = "INR"

class PaymentVerify(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str

class PaymentResponse(BaseModel):
    id: int
    user_id: Optional[int] = None
    registration_type: str
    registration_id: int
    amount: float
    currency: str
    razorpay_order_id: Optional[str] = None
    razorpay_payment_id: Optional[str] = None
    razorpay_signature: Optional[str] = None
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
