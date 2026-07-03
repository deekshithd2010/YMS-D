import os
import sys
from dotenv import load_dotenv
import pymysql

# Add current directory to path to import auth utils
sys.path.append(os.getcwd())
from utils.auth import verify_password

load_dotenv()

user = os.getenv("DB_USER", "root")
password = os.getenv("DB_PASSWORD", "")
host = os.getenv("DB_HOST", "localhost")
port = int(os.getenv("DB_PORT", "3306"))
db_name = os.getenv("DB_NAME", "yms_db")

try:
    conn = pymysql.connect(host=host, user=user, password=password, port=port, database=db_name)
    cursor = conn.cursor()
    cursor.execute("SELECT hashed_password, is_admin FROM users WHERE username = 'srinidhi'")
    res = cursor.fetchone()
    if res:
        hashed_pwd, is_admin = res
        print(f"User 'srinidhi' exists in DB. is_admin = {is_admin}")
        verified = verify_password("password123", hashed_pwd)
        print(f"Password 'password123' verification result: {verified}")
    else:
        print("User 'srinidhi' does not exist in DB!")
    conn.close()
except Exception as e:
    print(f"Error: {e}")
