import React, { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineMyLocation } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const useAuth = () => {
  return !!localStorage.getItem("token");
};

const districts = [
  "Raipur",
  "Bilaspur",
  "Durg",
  "Korba",
  "Jagdalpur",
  "Rajnandgaon",
  "Ambikapur",
  "Raigarh",
  "Kanker",
  "Kawardha",
  "Mahasamund",
  "Dhamtari",
];

const Navbar = ({ onNearbyData }) => {
  console.log("onNearbyData in Navbar:", onNearbyData); // This will log `undefined` if not passed properly.

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("EN");
  const navigate = useNavigate();
  const isAuthenticated = useAuth();

  const handleLogin = () => navigate("/login");
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

          // Fetch nearby hotels by passing latitude, longitude, and maxDistance
          try {
            const response = await fetch(
              `http://localhost:8000/api/v1/hotels/find-nearest`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  latitude,
                  longitude,
                  maxDistance: 1000, // Optional max distance, in miles
                }),
              }
            );
            if (response.ok) {
              const data = await response.json();
              if (onNearbyData) {
                onNearbyData(data); // Pass the nearby rentals to the parent component
              } else {
                console.error("onNearbyData is not a function");
              }
            } else {
              console.error("Failed to fetch nearby data");
            }
          } catch (error) {
            console.error("Error fetching nearby rentals:", error);
          }
        },
        (error) => alert("Error fetching location: " + error.message)
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-blue-600 text-white shadow-md">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold mr-5">
        RentMate
      </Link>

      {/* District Selector and Location */}
      <div className="flex items-center space-x-2">
        <select
          className="bg-gray-700 text-white px-3 py-1 rounded"
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
        >
          <option value="">Select District</option>
          {districts.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>
        <button
          onClick={getLocation}
          className="flex items-center px-2 py-1 bg-gray-500 rounded hover:bg-gray-400"
        >
          <MdOutlineMyLocation className="mr-1" />
          Find Near Me
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex-1 mx-5">
        <input
          type="text"
          placeholder="Search for rooms, flats, etc."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 text-black rounded border focus:ring-2 focus:ring-blue-300"
        />
      </div>

      {/* Language Selector */}
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="bg-gray-700 text-white px-3 py-1 rounded mx-2"
      >
        <option value="EN">English</option>
        <option value="HI">हिन्दी</option>
      </select>

      {/* Add Listing Button */}
      <Link
        to="/register"
        className="flex items-center px-4 py-2 bg-green-600 rounded hover:bg-green-500"
      >
        <IoMdAddCircleOutline className="mr-1 text-xl" />
        Add Listing
      </Link>

      {/* Auth and Profile */}
      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 rounded hover:bg-red-500"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-blue-700 rounded hover:bg-blue-600"
          >
            Login
          </button>
        )}
        <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-lg">
          P
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
