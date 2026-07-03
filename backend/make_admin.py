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

print("=" * 50)
print("             YMS ADMIN PROMOTION TOOL")
print("=" * 50)

username_to_promote = input("Enter username to make Admin: ").strip()

if not username_to_promote:
    print("\nError: Username cannot be empty.\n")
    exit()

try:
    conn = pymysql.connect(host=host, user=user, password=password, port=port, database=db_name)
    cursor = conn.cursor()
    
    # Check if user exists
    cursor.execute("SELECT id, is_admin FROM users WHERE username = %s", (username_to_promote,))
    user_record = cursor.fetchone()
    
    if not user_record:
        print(f"\n[Error] User '{username_to_promote}' not found.")
        print("Please register this user account on the website signup screen first!\n")
    else:
        user_id, is_admin = user_record
        if is_admin:
            print(f"\nUser '{username_to_promote}' is already an Admin!\n")
        else:
            cursor.execute("UPDATE users SET is_admin = 1 WHERE id = %s", (user_id,))
            conn.commit()
            print(f"\nSuccess! User '{username_to_promote}' is now an Admin.")
            print("They can now log in and see the Admin options/dashboard.\n")
            
    conn.close()
except Exception as e:
    print(f"\n[Error] Could not update user: {e}\n")
