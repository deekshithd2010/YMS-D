from database import SessionLocal, Base, engine
from models.user import User
from utils.auth import hash_password

# Ensure tables are created (especially if using SQLite yms.db for the first time)
Base.metadata.create_all(bind=engine)

db = SessionLocal()

print("Checking Admin credentials...")
try:
    admin = db.query(User).filter(User.username == "srinidhi").first()
    if admin:
        print("User 'srinidhi' already exists in the database.")
    else:
        # Create user 'srinidhi' with password 'password123'
        hashed_pwd = hash_password("password123")
        new_admin = User(
            username="srinidhi",
            email="srinidhi@example.com",
            hashed_password=hashed_pwd,
            name="Srinidhi Admin",
            is_admin=True,
            is_instructor=False
        )
        db.add(new_admin)
        db.commit()
        print("Successfully created Admin user 'srinidhi' with password 'password123'!")
except Exception as e:
    print(f"Error: {e}")
finally:
    db.close()
