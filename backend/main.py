from fastapi import FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from auth import create_token, decode_token
from data import users, restaurants, orders, payment_methods

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_headers=["*"],
    allow_methods=["*"],
)

def get_user(token: str):
    payload = decode_token(token)
    if payload["sub"] not in users:
        raise HTTPException(401, detail="User not found")
    return payload

@app.post("/login")
def login(username: str):
    u = users.get(username)
    if not u:
        raise HTTPException(401, detail="Invalid user")
    return {
        "token": create_token(username, u["role"], u["country"]),
        "role": u["role"]
    }

@app.get("/menu")
def menu(token: str = Header()):
    user = get_user(token)
    if user["role"] == "ADMIN":
        return restaurants
    return {user["country"]: restaurants.get(user["country"], [])}

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

@app.delete("/order/{order_id}")
def cancel_order(order_id: int, token: str = Header()):
    user = get_user(token)
    global orders
    for o in orders:
        if o["id"] == order_id:
            if user["role"] == "MEMBER" and o["user"] != user["sub"]:
                raise HTTPException(403)
            orders = [o for o in orders if o["id"] != order_id]
            return {"message": "Removed"}
    raise HTTPException(404, detail="Order not found")

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

@app.get("/admin/orders")
def admin_orders(token: str = Header()):
    user = get_user(token)
    if user["role"] != "ADMIN":
        raise HTTPException(403)
    return orders

@app.get("/my/orders")
def my_orders(token: str = Header()):
    user = get_user(token)
    user_orders = [o for o in orders if o["user"] == user["sub"]]
    return user_orders
