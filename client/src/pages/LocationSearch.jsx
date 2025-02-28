import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa';

const LocationSearch = () => {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [radius, setRadius] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (lat && lng && radius) {
      navigate(`/search?lat=${lat}&lng=${lng}&radius=${radius}`);
    } else {
      alert('Please provide valid latitude, longitude, and radius');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
      {/* Navigation Bar */}
      <nav className="w-full bg-gradient-to-r from-[#1e3a5f] via-[#256ea4] to-[#1b3b5f] py-4 text-center text-lg font-semibold text-white">
        Find Your Favorite Restaurant
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center justify-center gap-10">
        {/* Left Side - Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-bold text-[#ffcc00] mb-6">Explore & Savor: Find the Best Restaurants Near You</h1>
          <p className="text-gray-200 mb-6">
          Discover top-rated restaurants, cozy cafés, and must-visit eateries around you. Search by location and indulge in the finest dining experiences curated just for you.
          </p>
          <div className="space-y-4">
            <button
              onClick={() => navigate('/restaurant')}
              className="w-full md:w-auto py-3 px-6 bg-gradient-to-r from-[#ff1493] to-[#ff69b4] text-white rounded-lg hover:from-[#ff007f] hover:to-[#ff85c1] transition-all duration-300 flex items-center justify-center"
            >
              <FaSearch className="mr-2" /> View Restaurants
            </button>
            <button
              onClick={() => navigate('/search')}
              className="w-full md:w-auto py-3 px-6 bg-gradient-to-r from-[#1e90ff] to-[#00bfff] text-white rounded-lg hover:from-[#007fff] hover:to-[#5ac8fa] transition-all duration-300 flex items-center justify-center"
            >
              <FaMapMarkerAlt className="mr-2" /> Search Restaurants
            </button>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="md:w-1/2">
          <img
            src="https://avistaseo.com/wp-content/uploads/2024/08/Local-SEO-Services-in-Bangladesh.svg"
            alt="Restaurant"
            className="rounded-lg shadow-xl w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default LocationSearch;