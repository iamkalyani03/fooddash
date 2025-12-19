#  FoodDash – Full Stack Food Ordering Application

##  Project Overview
**FoodDash** is a full-stack food ordering web application built using **FastAPI (Python)** for the backend and **React.js** for the frontend.

The application supports **role-based access** for:
- **Admin**
- **Manager**
- **Member**

Users can browse menus, create and cancel orders, and view order history.  
Admins and Managers can also checkout orders and manage payments.

---

##  Technology Stack

### Backend
- **FastAPI** – API framework
- **Uvicorn** – ASGI server
- **Pydantic** – Data validation
- **python-dotenv** – Environment variable management
- **aiofiles** & **python-multipart** – File handling

### Frontend
- **React.js**
- **React Hooks**
- **Tailwind CSS** – UI styling

---

##  Demo Users

| Username | Role |
|--------|------|
| nick | ADMIN |
| marvel | MANAGER |
| america | MANAGER |
| thanos | MEMBER |
| thor | MEMBER |
| travis | MEMBER |

---

##  Setup & Installation

### Prerequisites
- Python **3.7+**
- Node.js **14+**
- npm

---

##  Backend Setup (FastAPI)

###  Install Dependencies
```bash
pip install -r backend/requirements.txt
```

###  Start Backend Server
```bash
python -m python -m uvicorn main:app --reload
```

Backend URL: http://localhost:8000  
Swagger Docs: http://localhost:8000/docs

---

##  Frontend Setup (React)

###  Navigate to Frontend Folder
```bash
cd frontend
```

###  Install Dependencies
```bash
npm install
```

###  Start React Server
```bash
npm start
```

Frontend URL: http://localhost:3000

---

##  Application Flow

###  Admin
- View all restaurants & menu items
- Create and cancel orders
- Checkout orders
- Update payment methods
- View order summary & revenue

###  Manager
- View menus by country
- Create & cancel orders
- Checkout orders
- Update payment methods

###  Member
- View menu items
- Create & cancel orders
- View order history
- Cannot checkout or manage payments

---

##  API Endpoints

| Method | Endpoint | Description |
|------|---------|------------|
| POST | `/login?username=` | Login & get JWT token |
| GET | `/menu` | Get menu items |
| POST | `/order?item=&price=` | Create order |
| DELETE | `/order/{id}` | Cancel order |
| POST | `/checkout?payment=` | Checkout (Admin & Manager) |
| GET | `/admin/orders` | View all orders (Admin) |
| GET | `/my/orders` | View user orders |

### Authentication
All protected APIs require JWT token in headers:
```
token: <JWT_TOKEN>
```

---

##  UI Features
- Veg / Non-Veg indicators  
  Green = Veg  
  Red = Non-Veg  
- Indicators are displayed above the item title, not on the image
- Clean dashboard icons
- Proper scroll behavior

---

##  Running the Application

```bash
# Start backend
python -m uvicorn backend.main:app --reload

# Start frontend
cd frontend
npm start
```

Open browser at http://localhost:3000  
Login using demo users based on role.

---

