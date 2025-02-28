import React, { useState } from "react";
import { FaHome, FaSearch, FaUtensils, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-900 shadow-md z-50 p-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link to="/" className="text-teal-300 text-2xl font-bold flex items-center">
          🍽️ DineDiscover
        </Link>

        <ul className="hidden md:flex space-x-8 text-teal-300 text-lg font-semibold">
          <li>
            <Link to="/" className="hover:text-white transition duration-300">
              <FaHome className="inline-block mr-1" /> Home
            </Link>
          </li>
          <li>
            <Link to="/restaurant" className="hover:text-white transition duration-300">
              <FaUtensils className="inline-block mr-1" /> Restaurants
            </Link>
          </li>
          <li>
            <Link to="/search" className="hover:text-white transition duration-300">
              <FaSearch className="inline-block mr-1" /> Search
            </Link>
          </li>
        </ul>

        <button className="md:hidden text-teal-300" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
        </button>
      </div>

      {menuOpen && (
        <ul className="md:hidden flex flex-col space-y-4 bg-gray-800 text-teal-300 p-4 absolute top-16 left-0 w-full shadow-lg">
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)} className="block text-lg hover:text-white">
              <FaHome className="inline-block mr-2" /> Home
            </Link>
          </li>
          <li>
            <Link to="/restaurant" onClick={() => setMenuOpen(false)} className="block text-lg hover:text-white">
              <FaUtensils className="inline-block mr-2" /> Restaurants
            </Link>
          </li>
          <li>
            <Link to="/search" onClick={() => setMenuOpen(false)} className="block text-lg hover:text-white">
              <FaSearch className="inline-block mr-2" /> Search
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
