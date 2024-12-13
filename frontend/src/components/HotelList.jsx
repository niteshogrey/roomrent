import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaWifi } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosCall } from "react-icons/io";
import { IoCallOutline } from "react-icons/io5";
import { MdMeetingRoom } from "react-icons/md";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { RiSofaLine } from "react-icons/ri";
import { MdOutlineWifiOff } from "react-icons/md";
import axios from "axios";
import { Link } from "react-router-dom";

// Custom hook to check if the user is authenticated
const useAuth = () => {
  // Example check: return true if token exists
  return !!localStorage.getItem("token");
};

const HotelList = ({ nearbyHotels, filterHotels }) => {
  const [hotels, setHotels] = useState([]); // Ensure initial state is an array
  const [currentIndexes, setCurrentIndexes] = useState({});
  const isAuthenticated = useAuth();

  useEffect(() => {
    if (Array.isArray(filterHotels) && filterHotels.length > 0) {
      setHotels([...filterHotels]); // Use filtered hotels
    } else if (Array.isArray(nearbyHotels) && nearbyHotels.length > 0) {
      const sortedHotels = [...nearbyHotels].sort(
        (a, b) => a.dist.calculated - b.dist.calculated
      );
      setHotels(sortedHotels); // Use nearby hotels
    } else {
      // Fetch all hotels if no filter or nearby data exists
      const fetchHotels = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8000/api/v1/hotels/hotels"
          );
          console.log(response.data);

          setHotels(response.data || []);
          const initialIndexes = (response.data || []).reduce((acc, hotel) => {
            acc[hotel._id] = 0;
            return acc;
          }, {});
          setCurrentIndexes(initialIndexes);
        } catch (error) {
          console.error("Error fetching hotels:", error);
        }
      };
      fetchHotels();
    }
  }, [filterHotels, nearbyHotels]);

  const handleNext = (hotelId, imagesLength) => {
    setCurrentIndexes((prevIndexes) => ({
      ...prevIndexes,
      [hotelId]: (prevIndexes[hotelId] + 1) % imagesLength,
    }));
  };

  const handlePrev = (hotelId, imagesLength) => {
    setCurrentIndexes((prevIndexes) => ({
      ...prevIndexes,
      [hotelId]: (prevIndexes[hotelId] - 1 + imagesLength) % imagesLength,
    }));
  };

  if (!Array.isArray(hotels)) {
    console.error("Hotels is not an array:", hotels);
    return <p>Error: Unable to display hotels. Please try again later.</p>;
  }

  return (
    <div className=" mt-2 flex flex-wrap w-full lg:justify-center px-4">
      {/* <div className="w-full mb-4 text-lg font-semibold text-gray-700">
        Showing 1 - {Math.min(30, hotels.length)} of {hotels.length} properties
        <div className="text-xl font-bold">Flats for Rent in Bilaspur</div>
      </div> */}

      <ul className="grid grid-cols-2 gap-3 ">
        {hotels.map((hotel) => (
          <li
            key={hotel._id}
            className="bg-white mb-0 p-4 h- flex flex-col sm:flex-row justify-start border items-center rounded-xl shadow"
          >
            {hotel.images && hotel.images.length > 0 ? (
              <div className="overflow-hidden relative bg-black content-center rounded-3xl w-full sm:w-64 h-72 mb-4 sm:mb-0">
                <div
                  className="flex transition-transform duration-500"
                  style={{
                    transform: `translateX(-${
                      currentIndexes[hotel._id] * 100
                    }%)`,
                  }}
                >
                  {hotel.images.map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      alt={`Hotel ${index + 1}`}
                      className="w-full sm:w-64 h-68 object-cover flex-shrink-0"
                    />
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-between p-2">
                  <button
                    className="p-1 rounded-full shadow bg-white opacity-80 text-gray-800 hover:bg-white"
                    onClick={() => handlePrev(hotel._id, hotel.images.length)}
                  >
                    <FaChevronLeft size={20} />
                  </button>
                  <button
                    className="p-1 rounded-full shadow bg-white opacity-80 text-gray-800 hover:bg-white"
                    onClick={() => handleNext(hotel._id, hotel.images.length)}
                  >
                    <FaChevronRight size={20} />
                  </button>
                </div>
                <div className="absolute bottom-4 right-0 left-0">
                  <div className="flex items-center justify-center gap-1">
                    {hotel.images.map((_, i) => (
                      <div
                        key={i}
                        className={`transition-all w-3 h-3 rounded-full ${
                          currentIndexes[hotel._id] === i
                            ? "bg-white p-1"
                            : "bg-white bg-opacity-50"
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p>No images available</p>
            )}
            <div className="sm:ml-10 flex flex-col w-full sm:w-auto">
              <div className="pb-5 flex flex-row items-center justify-between gap-">
                <div className="flex items-center font-bold text-2xl">
                  <FaIndianRupeeSign />
                  <p>{hotel.price}</p>
                </div>
                <h3 className="mb-2 font-semibold text-2xl">{hotel.name}</h3>
              </div>
              <div className="flex flex-col w-96 sm:flex-row gap-4 justify-between sm:gap-1 bg-slate-100 border p-4 sm:p-5 rounded">
                <div className="flex items-center gap-1">
                  <MdMeetingRoom className="text-xl sm:text-3xl" />
                  <div className="flex flex-col">
                    <p className="text-gray-500">Room</p>
                    <p className="text-slate-950 font-bold">{hotel.room}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex flex-col">
                    <p className="text-slate-950 font-bold">
                      {hotel.wifi === "Yes" ? (
                        <FaWifi className="text-xl sm:text-3xl" />
                      ) : (
                        <MdOutlineWifiOff className="text-xl sm:text-3xl" />
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <RiSofaLine className="text-3xl sm:text-5xl" />
                  <div className="flex flex-col">
                    <p className="text-gray-500">Furnished</p>
                    <p className="text-slate-950 font-bold">
                      {hotel.furnished ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="w-40 bg-orange-300">
                <a
                  className="font-semibold flex items-center"
                  href={`https://www.google.com/maps?q=${hotel.location.coordinates[1]},${hotel.location.coordinates[0]}`}
                  >
                <FaLocationDot /> {hotel.address}
                </a>
                 </div>
                <div className="ml-10 mt-2 flex flex-col sm:flex-row gap-4 sm:gap-10">
                  {isAuthenticated ? (
                    <button className="flex items-center gap-1 p-3 border border-green-500 bg-green-300 rounded-3xl">
                      <IoIosCall /> {hotel.phone}
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className="flex items-center gap-1 p-3 border border-green-800 bg-green-300 rounded-3xl"
                    >
                      <IoCallOutline />
                      Call to Owner
                    </Link>
                  )}
                </div>
              </div>
            </div>
            {/* <div className="relative bottom-28 text-slate-400 text-xs sm:text-base sm:mt-0">
              <p className="text-xs">
                Added on: {new Date(hotel.location.timestamp).toLocaleDateString()}
              </p>
            </div> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HotelList;
