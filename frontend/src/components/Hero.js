export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Delicious food, delivered fast 🍕
        </h1>
        <p className="text-lg opacity-90 mb-6">
          Order from top restaurants near you
        </p>
        <button className="bg-white text-red-600 px-6 py-3 rounded-full font-semibold shadow hover:scale-105 transition">
          Explore Restaurants
        </button>
      </div>
    </section>
  );
}
