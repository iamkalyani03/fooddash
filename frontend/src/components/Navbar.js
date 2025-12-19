export default function Navbar({ role, logout }) {
  return (
    <nav className="bg-[#87A96B] px-6 py-4 shadow flex justify-between items-center">
      <h1 className="text-2xl font-bold text-white">FoodDash</h1>
      <div className="flex gap-4 items-center">
        <span className="bg-white/30 text-white px-3 py-1 rounded-full">{role}</span>
        <button onClick={logout} className="bg-[#E2725B] hover:bg-[#C05A48] text-white px-3 py-1 rounded transition">Logout</button>
      </div>
    </nav>
  );
}
