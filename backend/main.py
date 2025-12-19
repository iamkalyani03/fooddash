from fastapi import FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from auth import create_token, decode_token
from data import users, restaurants, orders, payment_methods

app = FastAPI(
    title="Food Ordering App API",
    description="Backend for FoodDash React frontend",
    version="1.0.0"
)

# Allow your frontend domain for CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://fooddash-frontend.onrender.com",  # frontend live URL
        "http://localhost:3000"  # local testing
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Helper function to get user info from token
def get_user(token: str):
    try:
        payload = decode_token(token)
    except Exception:
        raise HTTPException(401, detail="Invalid token")
    
    if payload["sub"] not in users:
        raise HTTPException(401, detail="User not found")
    return payload

# Login endpoint
@app.post("/login")
def login(username: str):
    u = users.get(username)
    if not u:
        raise HTTPException(401, detail="Invalid user")
    token = create_token(username, u["role"], u["country"])
    return {"token": token, "role": u["role"]}

# Get menu
@app.get("/menu")
def menu(token: str = Header()):
    user = get_user(token)
    if user["role"] == "ADMIN":
        return restaurants
    return {user["country"]: restaurants.get(user["country"], [])}

# Add order
@app.post("/order")
def add_order(item: str, price: int, token: str = Header()):
    user = get_user(token)
    order = {
        "id": len(orders) + 1,
        "user": user["sub"],
        "item": item,
        "qty": 1,
        "total": price,
        "payment": None,
        "status": "CREATED"
    }
    orders.append(order)
    return order

# Cancel order
@app.delete("/order/{order_id}")
def cancel_order(order_id: int, token: str = Header()):
    user = get_user(token)
    global orders
    for o in orders:
        if o["id"] == order_id:
            if user["role"] == "MEMBER" and o["user"] != user["sub"]:
                raise HTTPException(403, detail="Forbidden")
            orders = [order for order in orders if order["id"] != order_id]
            return {"message": "Removed"}
    raise HTTPException(404, detail="Order not found")

# Checkout
@app.post("/checkout")
def checkout(payment: str, token: str = Header()):
    if payment not in payment_methods:
        raise HTTPException(400, detail="Invalid payment method")
    user = get_user(token)
    for o in orders:
        if o["user"] == user["sub"] and o["status"] == "CREATED":
            o["payment"] = payment
            o["status"] = "PAID"
    return {"message": "Paid"}

# Admin: view all orders
@app.get("/admin/orders")
def admin_orders(token: str = Header()):
    user = get_user(token)
    if user["role"] != "ADMIN":
        raise HTTPException(403, detail="Forbidden")
    return orders

# Member: view own orders
@app.get("/my/orders")
def my_orders(token: str = Header()):
    user = get_user(token)
    user_orders = [o for o in orders if o["user"] == user["sub"]]
    return user_orders
