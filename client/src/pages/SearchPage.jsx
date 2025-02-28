import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RestaurantCard from '../components/RestaurantCard';

const SearchPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const lat = queryParams.get('lat');
  const lng = queryParams.get('lng');
  const radius = queryParams.get('radius');

  useEffect(() => {
    if (!lat || !lng || !radius) {
      setError('Missing query parameters.');
      setLoading(false);
      return;
    }

    const fetchRestaurants = async () => {
      try {
        const response = await fetch(
          `https://webapp-satyatej10-main.onrender.com/restaurants/location?lat=${lat}&lng=${lng}&radius=${radius}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setRestaurants(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [lat, lng, radius]);

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-black min-h-screen py-16 text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-pink-500 mb-8">
          Nearby Restaurants 🍽️
        </h2>

        {loading && (
          <p className="text-center text-gray-400 animate-pulse">Loading...</p>
        )}
        {error && <p className="text-center text-red-500">Error: {error}</p>}

        {!loading && !error && restaurants.length === 0 && (
          <p className="text-center text-gray-400">No restaurants found.</p>
        )}

        {!loading && !error && restaurants.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {restaurants.map((item, index) => (
              <div
                key={index}
                className="transform transition duration-300 hover:scale-105 hover:shadow-lg"
              >
                <RestaurantCard restaurant={item.restaurant} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
