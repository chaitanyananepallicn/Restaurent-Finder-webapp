import { useState, useEffect } from "react";
import RestaurantCard from "../components/RestaurantCard";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://webapp-satyatej10-main.onrender.com/restaurants?page=${page}`);
        const data = await response.json();
        console.log(data);
        setRestaurants(data.restaurants || []);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
      setLoading(false);
    };

    fetchRestaurants();
  }, [page]);

  return (
    <div className="w-full px-6 pt-20 min-h-screen bg-gray-900 text-gray-300">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-200">🍔 Craving Something Delicious?</h1>
        <p className="text-lg text-gray-400 mt-2">Explore top-rated restaurants serving mouthwatering dishes near you.</p>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin h-12 w-12 border-t-4 border-pink-500 border-solid rounded-full"></div>
          <p className="ml-4 text-xl font-semibold text-gray-400">Finding the best spots for you...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.restaurant.id} restaurant={restaurant.restaurant} />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-8 space-x-6">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className={`px-6 py-3 rounded-full text-lg font-semibold shadow-md transition-all ${
            page === 1 ? "bg-gray-700 text-gray-500 cursor-not-allowed" : "bg-pink-600 text-white hover:bg-pink-700"
          }`}
        >
          ◀ Previous
        </button>
        <span className="text-lg font-semibold text-gray-300">Page {page}</span>
        <button
          onClick={() => setPage(page + 1)}
          className="px-6 py-3 rounded-full text-lg font-semibold bg-pink-600 text-white hover:bg-pink-700 shadow-md transition-all"
        >
          Next ▶
        </button>
      </div>
    </div>
  );
};

export default RestaurantList;
