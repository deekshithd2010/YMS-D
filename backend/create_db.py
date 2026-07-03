import pymysql
import os
from dotenv import load_dotenv

# Load config
load_dotenv()

user = os.getenv("DB_USER", "root")
password = os.getenv("DB_PASSWORD", "")
host = os.getenv("DB_HOST", "localhost")
port = int(os.getenv("DB_PORT", "3306"))
db_name = os.getenv("DB_NAME", "yms_db")

print(f"Connecting to MySQL at {host}:{port} as user '{user}'...")
try:
    # Connect without specifying database name to create it
    conn = pymysql.connect(host=host, user=user, password=password, port=port)
    cursor = conn.cursor()
    cursor.execute(f"CREATE DATABASE IF NOT EXISTS {db_name}")
    print(f"Database '{db_name}' checked and verified successfully!")
    conn.close()
except Exception as e:
    print(f"\n[Error] Could not create database: {e}")
    print("\nPlease verify:")
    print(f"1. Your MySQL server is running on {host}:{port}")
    print("2. Your username and password inside the backend/.env file are correct.\n")
