export default function OrderHistory({ orders }) {
  if (orders.length === 0) return null;
  return (
    <div className="bg-white p-4 rounded-xl shadow mt-6">
      <h3 className="font-bold mb-3">📜 Order History</h3>
      {orders.map(o => (
        <div key={o.id} className="flex justify-between py-2 border-b animate-fadeIn">
          <span>{o.item} • <span className="text-[#E2725B] font-semibold">₹{o.total}</span></span>
          <span className="text-green-600 font-semibold">{o.status}</span>
        </div>
      ))}
    </div>
  );
}
