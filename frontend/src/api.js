const BASE = "http://localhost:8000";

export const login = (u) =>
  fetch(`${BASE}/login?username=${u}`, { method: "POST" }).then(r => r.json());

export const getMenu = (token) =>
  fetch(`${BASE}/menu`, { headers: { token } }).then(r => r.json());

export const addOrder = (token, item, price) =>
  fetch(`${BASE}/order?item=${item}&price=${price}`, {
    method: "POST",
    headers: { token }
  });

export const cancelOrder = (id, token) =>
  fetch(`${BASE}/order/${id}`, {
    method: "DELETE",
    headers: { token }
  });

export const checkout = (token, payment) =>
  fetch(`${BASE}/checkout?payment=${payment}`, {
    method: "POST",
    headers: { token }
  });

export const adminOrders = (token) =>
  fetch(`${BASE}/admin/orders`, { headers: { token } }).then(r => r.json());

export const myOrders = (token) =>
  fetch(`${BASE}/my/orders`, { headers: { token } }).then(r => r.json());
