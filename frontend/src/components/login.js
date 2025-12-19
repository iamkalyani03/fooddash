import { useState, useEffect } from "react";

const images = [
  "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1606756790138-261d2b21cd75?auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1470&q=80",
];

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${images[index]})` }}
      />
      <div className="absolute inset-0 bg-black/20" /> {/* subtle overlay for contrast */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="bg-[#FDF5E6] w-full max-w-md p-8 rounded-3xl shadow-2xl">
          <h1 className="text-4xl font-bold text-[#87A96B] text-center mb-3">FoodDash 🍔</h1>
          <p className="text-center text-gray-700 mb-6">Login to manage or order food</p>
          <input
            className="border w-full p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#87A96B] transition"
            placeholder="Enter username (nick, marvel, thanos...)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            onClick={() => onLogin(username)}
            className="w-full bg-[#E2725B] hover:bg-[#C05A48] text-white py-3 rounded-lg font-semibold transition transform hover:scale-105"
          >
            Login
          </button>
          <div className="text-xs text-gray-600 mt-4 text-center">
            Demo Users: <span className="font-medium">nick</span> | <span className="font-medium">marvel</span> | <span className="font-medium">thanos</span> | <span className="font-medium">thor</span> | <span className="font-medium">travis</span>
          </div>
        </div>
      </div>
    </div>
  );
}
