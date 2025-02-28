import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import RestaurantCard from "../components/RestaurantCard";

const ImageSearch = () => {
  const location = useLocation();
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const imageFile = location.state?.image;

  useEffect(() => {
    if (!imageFile) {
      console.warn("No image provided for search");
      setIsLoading(false);
      return;
    }

    const uploadImageAndFetchResults = async () => {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", imageFile);

      try {
        const response = await fetch("https://api.example.com/search-by-image", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch results");
        }

        const result = await response.json();
        setRestaurants(result.restaurants || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    uploadImageAndFetchResults();
  }, [imageFile]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-16 px-6">
      <h1 className="text-4xl font-extrabold text-center text-pink-500 mb-8">
        Search Restaurants by Image 📸
      </h1>

      {isLoading ? (
        <p className="text-center text-gray-400 animate-pulse">
          Searching for restaurants...
        </p>
      ) : restaurants.length === 0 ? (
        <p className="text-center text-gray-500">No matches found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="transform transition duration-300 hover:scale-105"
            >
              <RestaurantCard restaurant={restaurant} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSearch;
