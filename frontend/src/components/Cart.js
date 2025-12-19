export default function Cart({ orders, onCancel }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-bold mb-3">🛒 Cart</h3>
      {orders.length === 0 && <p className="text-gray-400">Empty</p>}
      {orders.map(o => (
        <div key={o.id} className="flex justify-between py-2 border-b">
          <span>{o.item} • <span className="text-[#E2725B] font-semibold">₹{o.total}</span></span>
          <button onClick={() => onCancel(o.id)} className="text-[#E2725B] hover:text-[#C05A48]">Remove</button>
        </div>
      ))}
    </div>
  );
}
