from jose import jwt

SECRET = "fooddash-secret"
ALGO = "HS256"

def create_token(username, role, country):
    return jwt.encode(
        {"sub": username, "role": role, "country": country},
        SECRET,
        algorithm=ALGO
    )

def decode_token(token):
    return jwt.decode(token, SECRET, algorithms=[ALGO])
