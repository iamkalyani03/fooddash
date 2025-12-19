// Images for items
const itemImages = {
  "Biryani": "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=600&q=80",
  "Burger": "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80"
};

// Veg / Non-Veg type
const itemType = {
  "Biryani": "NON_VEG",
  "Burger": "VEG"
};

export default function RestaurantList({ menu, onAdd }) {
  return Object.entries(menu).map(([country, items]) => (
    <div key={country} className="bg-white p-4 rounded-xl shadow mb-6">
      <h3 className="font-bold mb-3 text-[#87A96B]">📍 {country}</h3>
      {items.map(i => (
        <div key={i.item} className="flex items-center gap-4 border rounded-lg p-2 mb-2 hover:shadow-lg transition transform hover:scale-105">
          
          {/* Veg/Non-Veg Circle placed before image */}
          <span className={`w-4 h-4 rounded-full ${itemType[i.item] === "VEG" ? "bg-green-500" : "bg-red-500"}`}></span>
          
          {/* Food Image */}
          <img src={itemImages[i.item]} alt={i.item} className="w-16 h-16 rounded-lg object-cover"/>
          
          <div className="flex-1">
            <p className="font-semibold">{i.item}</p>
            <p className="text-[#E2725B] font-bold">₹{i.price}</p>
          </div>
          <button
            onClick={() => onAdd(i.item, i.price)}
            className="bg-[#E2725B] hover:bg-[#C05A48] text-white px-4 py-1 rounded transition transform hover:scale-105"
          >
            Add
          </button>
        </div>
      ))}
    </div>
  ));
}
