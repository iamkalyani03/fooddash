export default function AdminDashboard({ orders }) {
  const totalOrders = orders.length;
  const totalRevenue = orders
    .filter(o => o.status === "PAID")
    .reduce((sum, o) => sum + o.total, 0);

  const statusCount = orders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="bg-[#FDF5E6] p-4 rounded-xl shadow mb-6 animate-fadeIn">
      <h2 className="text-2xl font-bold text-[#87A96B] mb-4">🗂️ Admin Dashboard</h2>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        {["CREATED", "PAID"].map(status => (
          <div key={status} className="bg-white rounded-xl p-4 shadow flex flex-col items-center">
            <span className="text-gray-600 font-semibold">{status}</span>
            <span className="text-[#E2725B] font-bold text-xl">{statusCount[status] || 0}</span>
          </div>
        ))}
        <div className="bg-white rounded-xl p-4 shadow flex flex-col items-center">
          <span className="text-gray-600 font-semibold">Total Orders</span>
          <span className="text-[#E2725B] font-bold text-xl">{totalOrders}</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow">
          <thead className="bg-[#87A96B] text-white">
            <tr>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Item</th>
              <th className="px-4 py-2">Qty</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Payment</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} className="text-center border-b">
                <td className="px-4 py-2">{o.user}</td>
                <td className="px-4 py-2 flex items-center justify-center gap-2">
                  {/* Veg/Non-Veg Circle */}
                  <span className={`w-3 h-3 rounded-full ${o.item === "Burger" ? "bg-green-500" : "bg-red-500"}`}></span>
                  
                  <img src={o.item === "Burger" 
                      ? "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=50&q=80" 
                      : "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=50&q=80"} 
                      alt={o.item} className="w-10 h-10 rounded-lg object-cover"/>
                  {o.item}
                </td>
                <td className="px-4 py-2">{o.qty}</td>
                <td className="px-4 py-2">₹{o.total}</td>
                <td className="px-4 py-2">{o.payment || "Not Paid"}</td>
                <td className="px-4 py-2">{o.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 bg-white p-4 rounded-xl shadow flex justify-between">
        <span className="text-gray-700 font-semibold">Total Revenue:</span>
        <span className="text-[#E2725B] font-bold text-xl">₹{totalRevenue}</span>
      </div>
    </div>
  );
}
