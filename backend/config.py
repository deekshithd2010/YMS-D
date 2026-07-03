import os
from dotenv import load_dotenv

# Load environmental variables from .env file
load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY", "a4f8e2c1d3b5a7f9e0c2d4b6a8f1e3c5d7b9a0f2e4c6d8b1a3f5e7c9d0b2a4f6")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# Database Configuration
DB_ENGINE = os.getenv("DB_ENGINE", "sqlite")  # 'sqlite' or 'mysql'
DB_USER = os.getenv("DB_USER", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "3306")
DB_NAME = os.getenv("DB_NAME", "yms_db")

if DB_ENGINE == "mysql":
    DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
else:
    DATABASE_URL = "sqlite:///./yms.db"
