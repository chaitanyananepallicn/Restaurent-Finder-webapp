import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RestaurantCard from "../components/RestaurantCard";

const NamePage = () => {
  const { name: restaurantName } = useParams();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const restaurantsPerPage = 9;

  useEffect(() => {
    if (!restaurantName) {
      console.warn("No restaurant name provided in URL params");
      return;
    }

    console.log("🔍 Searching for:", restaurantName);

    const fetchRestaurants = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://webapp-satyatej10-main.onrender.com/restaurants/searchbyname?name=${restaurantName}`
        );

        const data = await response.json();
        console.log("API Response:", data);

        if (data.restaurants) {
          const extractedRestaurants = data.restaurants
            .map((item) => item?.restaurants?.restaurant)
            .filter(Boolean);

          setRestaurants(extractedRestaurants);
        } else {
          console.warn("No restaurants found in API response");
        }
      } catch (error) {
        console.error("❌ Error fetching restaurants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [restaurantName]);

  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  const currentRestaurants = restaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant);

  return (
    <div className="container mx-auto p-8 pt-20 min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">
          🍽️ Results for "<span className="text-pink-500">{restaurantName}</span>"
        </h2>
      </div>

      {/* Loading and No Results */}
      {loading ? (
        <p className="text-center text-gray-400 text-lg animate-pulse">Finding the best spots for you...</p>
      ) : currentRestaurants.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">No restaurants found.</p>
      ) : (
        <>
          {/* Restaurant Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {currentRestaurants.map((restaurant, index) => (
              <RestaurantCard key={index} restaurant={restaurant} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-6 py-3 rounded-full font-semibold shadow-md transition-all ${
                currentPage === 1
                  ? "bg-gray-700 cursor-not-allowed text-gray-400"
                  : "bg-pink-600 hover:bg-pink-700 text-white"
              }`}
            >
              ◀ Previous
            </button>

            <span className="text-gray-300 text-lg font-semibold">
              Page {currentPage}
            </span>

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={indexOfLastRestaurant >= restaurants.length}
              className={`px-6 py-3 rounded-full font-semibold shadow-md transition-all ${
                indexOfLastRestaurant >= restaurants.length
                  ? "bg-gray-700 cursor-not-allowed text-gray-400"
                  : "bg-pink-600 hover:bg-pink-700 text-white"
              }`}
            >
              Next ▶
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NamePage;
