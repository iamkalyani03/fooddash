import { useState, useEffect } from "react";
import { login, getMenu, addOrder, cancelOrder, checkout, adminOrders, myOrders } from "./api";

import Login from "./components/login";
import Navbar from "./components/Navbar";
import RestaurantList from "./components/RestaurantList";
import Cart from "./components/Cart";
import AdminDashboard from "./components/AdminDashboard";
import OrderHistory from "./components/OrderHistory";

export default function App() {
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const [menu, setMenu] = useState({});
  const [orders, setOrders] = useState([]);
  const [payment, setPayment] = useState("CREDIT_CARD");
  const [selectedUser, setSelectedUser] = useState("");

  const handleLogin = async (u) => {
    const r = await login(u);
    setToken(r.token);
    setRole(r.role);
    setMenu(await getMenu(r.token));
    if (r.role !== "ADMIN") setOrders(await myOrders(r.token));
  };

  const fetchOrders = async () => {
    if (role === "ADMIN") {
      setOrders(await adminOrders(token));
    } else {
      setOrders(await myOrders(token));
    }
  };

  const handleAddOrder = async (item, price) => {
    await addOrder(token, item, price);
    await fetchOrders();
  };

  const handleCancelOrder = async (id) => {
    await cancelOrder(id, token);
    await fetchOrders();
  };

  const handleCheckout = async () => {
    await checkout(token, payment);
    await fetchOrders();
  };

  useEffect(() => {
    let interval;
    if (role === "ADMIN") {
      interval = setInterval(fetchOrders, 1000);
    }
    return () => clearInterval(interval);
  }, [role, token]);

  if (!token) return <Login onLogin={handleLogin} />;

  return (
    <>
      <Navbar role={role} logout={() => window.location.reload()} />
      <div className="p-6 bg-[#FDF5E6] min-h-screen flex flex-col gap-6">
        {role === "ADMIN" && <AdminDashboard orders={orders} />}

        <div className="grid grid-cols-3 gap-6 flex-1 overflow-auto">
          <div className="col-span-2 overflow-auto max-h-[80vh]">
            <RestaurantList menu={menu} onAdd={handleAddOrder} />
          </div>

          <div className="overflow-auto max-h-[80vh] flex flex-col gap-4">
            <Cart orders={orders.filter(o => o.status === "CREATED")} onCancel={handleCancelOrder} />

            {role !== "MEMBER" && orders.some(o => o.status === "CREATED") && (
              <div className="bg-white p-4 rounded-xl shadow">
                <select className="border p-2 w-full rounded mb-2" onChange={(e) => setPayment(e.target.value)} value={payment}>
                  <option>CREDIT_CARD</option>
                  <option>UPI</option>
                  <option>CASH</option>
                </select>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#E2725B] hover:bg-[#C05A48] text-white py-2 rounded font-semibold transition transform hover:scale-105"
                >
                  Checkout
                </button>
              </div>
            )}

            <OrderHistory orders={orders.filter(o => o.status === "PAID")} />
          </div>
        </div>
      </div>
    </>
  );
}
