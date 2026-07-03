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

try:
    conn = pymysql.connect(host=host, user=user, password=password, port=port, database=db_name)
    cursor = conn.cursor()
    cursor.execute("SHOW TABLES")
    tables = cursor.fetchall()
    
    print(f"\nDatabase: {db_name} (MySQL)")
    print("=" * 45)
    if not tables:
        print("No tables found. Run the FastAPI server first to initialize tables.")
    else:
        print(f"{'Table Name':<25} | {'Row Count':<10}")
        print("-" * 45)
        for (table_name,) in tables:
            cursor.execute(f"SELECT COUNT(*) FROM `{table_name}`")
            (count,) = cursor.fetchone()
            print(f"- {table_name:<23} | {count:<10}")
    print("=" * 45 + "\n")
    conn.close()
except Exception as e:
    print(f"\n[Error] Could not connect: {e}\n")
