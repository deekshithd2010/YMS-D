from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
import models  # import registers tables with metadata

# Import all routers
from routers import auth, profile, students, teachers, registrations, contact, instructors, payments

# Import new routers with try/except for graceful fallback
try:
    from routers import admin_dashboard
except ImportError:
    admin_dashboard = None

try:
    from routers import yoga_manage
except ImportError:
    yoga_manage = None

try:
    from routers import instructor_router
except ImportError:
    instructor_router = None

app = FastAPI(
    title="YMS API",
    description="Yoga Management System REST API backend written in FastAPI"
)

# CORS Configuration
origins = [
    "http://localhost:5173",      # Vite dev server
    "http://127.0.0.1:5173",    # Vite alternate dev server
    "http://localhost:3000",      # Create-react-app server
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Startup DB table creation
@app.on_event("startup")
def startup_event():
    Base.metadata.create_all(bind=engine)
    print("Database tables created successfully.")

# Include routers under the /ymsapi prefix to match frontend calls
app.include_router(auth.router, prefix="/ymsapi")
app.include_router(profile.router, prefix="/ymsapi")
app.include_router(students.router, prefix="/ymsapi")
app.include_router(teachers.router, prefix="/ymsapi")
app.include_router(registrations.router, prefix="/ymsapi")
app.include_router(contact.router, prefix="/ymsapi")
app.include_router(instructors.router, prefix="/ymsapi")
app.include_router(payments.router, prefix="/ymsapi")

# Include new routers
if admin_dashboard:
    app.include_router(admin_dashboard.router, prefix="/ymsapi")
if yoga_manage:
    app.include_router(yoga_manage.router, prefix="/ymsapi")
if instructor_router:
    app.include_router(instructor_router.router, prefix="/ymsapi")

@app.get("/")
def read_root():
    return {"message": "YMS API is running!"}

