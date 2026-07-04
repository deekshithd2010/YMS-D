# Yoga Management System (YMS-D)

A modern, highly premium, and responsive **Yoga Management System** tailored for yoga studios. It features isolated dashboards for Administrators and Instructors, integrated registration & booking flows, a simulated payment gateway, and dynamic data presentation.

---

## 🚀 Key Features

### 👤 Client Portal & Website
*   **Interactive Sessions & Courses:** Responsive landing pages displaying available yoga slots and academic yoga courses.
*   **Booking Forms:** Automated data-collection forms with validations.
*   **Simulated Payment Gateway:** Complete integration of a simulated **Razorpay** checkout flow.
*   **Client Profiles:** Tracks individual course registrations, batches, and payment statuses.

### 🛡️ Admin Dashboard (`/Admin`)
*   **Isolated Console:** Completely hides the main website's navbar/footer for an uninterrupted administration workspace.
*   **Bookings Management:** Review session and course bookings with live payment indicators.
*   **CRUD Controls:** Full capabilities to Add, Edit, and Delete courses and sessions.
*   **Instructor Assignments:** Bind instructors to specific session timings or course codes.
*   **User & Instructor Management:** Register new clients or create instructors (auto-generates secure temporary passwords).

### 🧘 Instructor Portal (`/Instructor`)
*   **Personal Dashboard:** Displays assigned sessions and courses in interactive accordion panels.
*   **Roster Tracking:** View lists of enrolled students for each session or course, with contact information.

---

## 🛠️ Technology Stack

*   **Frontend:** React (Vite), Chakra UI, Axios, React Router.
*   **Backend:** FastAPI, SQLite, SQLAlchemy ORM, bcrypt (secure password hashing).
*   **Database:** SQLite (default for instant running) or MySQL support.

---

## 💻 Setup & Installation

### Prerequisite
Ensure you have **Python 3.10+** and **Node.js** installed on your system.

### 1. Backend Setup

1.  Navigate into the `backend` folder:
    ```bash
    cd backend
    ```
2.  Install required Python packages:
    ```bash
    pip install -r requirements.txt
    ```
3.  Initialize the database file and schema:
    ```bash
    python create_db.py
    ```
4.  Generate the default Admin credentials:
    ```bash
    python create_admin.py
    ```
5.  Start the FastAPI development server:
    ```bash
    uvicorn main:app --reload --port 8000
    ```

*The backend documentation will be accessible at `http://127.0.0.1:8000/docs`.*

---

### 2. Frontend Setup

1.  Navigate into the `frontend` folder:
    ```bash
    cd ../frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the local Vite development server:
    ```bash
    npm run dev
    ```

*Open your browser and navigate to the local address displayed (typically `http://localhost:5173`).*

---

## 🔐 Default Credentials

Use the following credentials to access the Admin Panel for testing:

*   **Admin Username:** `srinidhi`
*   **Admin Password:** `password123`

*(Once logged in, you will be redirected automatically to the Admin Dashboard).*
