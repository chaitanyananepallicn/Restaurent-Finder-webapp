import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="bg-gray-900 text-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border border-gray-700">
      {/* Restaurant Image */}
      <div className="relative">
        <img
          src={restaurant.featured_image || "https://via.placeholder.com/400"}
          alt={restaurant.name}
          className="w-full h-56 object-cover rounded-t-xl"
          loading="lazy"
        />
        <span className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs font-semibold px-2 py-1 rounded-md">
          {restaurant.establishment || "Restaurant"}
        </span>
      </div>

      {/* Restaurant Details */}
      <div className="p-4">
        <h3 className="text-lg font-bold truncate">{restaurant.name}</h3>
        <p className="text-sm text-gray-400 truncate">{restaurant.cuisines}</p>

        {/* Rating and Votes */}
        <div className="flex items-center mt-2">
          <span className="flex items-center text-yellow-400 font-bold text-sm">
            <FaStar className="mr-1" />
            {restaurant.user_rating.aggregate_rating}
          </span>
          <span className="text-gray-400 ml-2 text-xs">({restaurant.user_rating.votes} votes)</span>
        </div>

        {/* Address */}
        <p className="text-xs text-gray-500 mt-2 truncate">{restaurant.location.address}</p>

        {/* Order & Details Button */}
        <div className="flex justify-between items-center mt-4">
          <Link
            to={`/restaurant/${restaurant.id}`}
            className="bg-pink-600 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-pink-700 transition duration-300"
          >
            Order Now
          </Link>
          <span className="text-sm font-medium text-gray-300">⏳ {restaurant.delivery_time || "30 min"}</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
