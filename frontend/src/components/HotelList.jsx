import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaWifi } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosCall } from "react-icons/io";
import { IoCallOutline } from "react-icons/io5";
import { MdMeetingRoom } from "react-icons/md";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { RiSofaLine } from "react-icons/ri";
import { MdOutlineWifiOff } from "react-icons/md";
import { IoIosHeart } from "react-icons/io";
import { TbShare3 } from "react-icons/tb";
import { FaBed } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllHotels } from "../features/hotels/hotelsAPI";

// Custom hook to check if the user is authenticated
const useAuth = () => {
  return !!localStorage.getItem("token");
};

const HotelList = () => {
  const dispatch = useDispatch();
  const { hotels, status, error } = useSelector((state) => state.hotels);
  const [currentIndexes, setCurrentIndexes] = useState({});
  const isAuthenticated = useAuth();

  // Fetch hotels when the component mounts
  useEffect(() => {
    dispatch(getAllHotels());
  }, [dispatch]);


  useEffect(() => {
    // Initialize currentIndexes when hotels are loaded
    if (hotels && hotels.length > 0) {
      const initialIndexes = hotels.reduce((acc, hotel) => {
        console.log("acc", acc);
        acc[hotel._id] = 0;
        return acc;
      }, {});
      setCurrentIndexes(initialIndexes);
    }
  }, [hotels]);

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

  if (status === "loading") {
    return <p>Loading hotels...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
    <div className="hidden md:block mt-2 px-4">
      <ul className="grid grid-cols-2 gap-3">
        {hotels.map((hotel) => (
          <li
            key={hotel._id}
            className="bg-gray-200 mb-0 p-4 h- flex flex-col sm:flex-row justify-start border items-center rounded-xl shadow"
          >
            {hotel.images && hotel.images.length > 0 ? (
              <div className="overflow-hidden relative bg-black content-center rounded-3xl border border-black w-full sm:w-64 h-72 mb-4 sm:mb-0">
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
              <div className="pb-5 flex flex-row items-center  justify-between gap-">
                <div className="flex items-center font-bold text-2xl">
                  <FaIndianRupeeSign />
                  <p>{hotel.price}</p>
                </div>
                <h3 className="mb-2 font-semibold text-2xl">{hotel.name}</h3>
              </div>
              <div className="flex flex-col w-96 sm:flex-row gap-4 justify-between sm:gap-1 bg-slate-100 border border-black p-4 sm:p-5 rounded">
                <div className="flex flex-col items-center gap-1">
                  <MdMeetingRoom className="text-xl sm:text-3xl" />                    
                  <p className="text-slate-950 font-bold">{hotel.room}</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <FaBed className="text-xl sm:text-3xl" />
                    <p className="text-slate-950 font-bold">{hotel.bed}</p>
                  
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex flex-col">
                    <p className="text-slate-950 font-bold">
                      {hotel.wifi === "Yes" ? ( 
                        <span className="flex flex-col items-center text-slate-950 font-bold"><FaWifi className="text-xl sm:text-3xl" />{hotel.wifi}</span>
                      ) : (
                          <span className="flex flex-col items-center text-slate-950 font-bold"><MdOutlineWifiOff className="text-xl sm:text-3xl" />{hotel.wifi}</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center ">
                  <RiSofaLine className="text-xl sm:text-3xl gap-1" />
                    <p className="text-slate-950 font-bold">
                      {hotel.furnished ? "Yes" : "No"}
                    </p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="w-40">
                  <a
                    className="font-semibold flex items-center bg-white p-2 border border-blue-950 rounded-full text-blue-950 gap-1"
                    href={`https://www.google.com/maps?q=${hotel.location.coordinates[1]},${hotel.location.coordinates[0]}`}
                    target="_blank"
                  >
                    <FaLocationDot /> {hotel.address.address1}
                  </a>
                </div>
                <div className="ml-10 mt-2 flex flex-col sm:flex-row gap-4 sm:gap-10">
                  {isAuthenticated ? (
                    <button className="flex items-center gap-1 p-2 border border-blue-500 bg-blue-300 rounded-3xl">
                      <IoIosCall /> {hotel.phone}
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className="flex items-center gap-1 p-2 border border-blue-500 bg-blue-300 rounded-3xl"
                    >
                      <IoCallOutline />
                      Call to Owner
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      
    </div>
    {/* modile responsive  */}
    <div className="block lg:hidden overflow-x-auto px-4 mt-4 mb-16">
        <div className="flex gap-4">
          {hotels.map((hotel) => (
            <div
              key={hotel._id}
              className="relative bg-gray-200  border border-blue-950 rounded-3xl w-56 sm:w-64 h-96 flex-shrink-0"
            >
               {hotel.images && hotel.images.length > 0 ? (
          <div className="overflow-hidden relative w-full h-44">
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
                  className="w-full h-44 object-cover flex-shrink-0 rounded-t-3xl"
                />
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-between px-2">
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
            <div className="absolute bottom-2 right-0 left-0">
              <div className="flex items-center justify-center gap-1">
                {hotel.images.map((_, i) => (
                  <div
                    key={i}
                    className={`transition-all w-2 h-2 rounded-full ${
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
              <button
                type="button"
                className="text-red-600 absolute top-3 right-3 p-1 text-2xl bg-white rounded-full border-blue-950 "
              >
                <IoIosHeart />
              </button>
              <div className="flex justify-between items-center p-2">
                <p className="flex  items-center font-bold text-xl">
                  <FaIndianRupeeSign /> {hotel.price}
                </p>
                <h3 className="font-semibold">{hotel.name}</h3>
              </div>
              <div className="flex justify-between p-2 border-t">
                <p className="text-sm flex flex-col items-center">
                  <MdMeetingRoom className="text-xl" /> <span>{hotel.room}</span>
                </p>
                <p className="text-sm flex flex-col items-center">
                  <FaBed className="text-xl" /> {hotel.bed}
                </p>
                <p className="text-sm flex flex-col items-center">
                {hotel.wifi === "Yes" ? (
                        <FaWifi className="text-xl sm:text-3xl" />
                      ) : (
                        <MdOutlineWifiOff className="text-xl sm:text-3xl" />
                      )}
                </p>

                <p className="text-sm flex flex-col items-center">
                  <RiSofaLine className="text-xl" /> Yes
                </p>
              </div>
              <div className="flex flex-col gap-3 justify-between p-3">
                <a
                  className="flex items-center w-fit bg-white border border-blue-950 text-blue-950 rounded-full px-3 py-1 text-sm"
                  href={`https://www.google.com/maps?q=${hotel.location.coordinates[1]},${hotel.location.coordinates[0]}`}
                >
                  <FaLocationDot />
                  {hotel.address.address1}
                </a>
                <div className="flex justify-between ">
                  <button className="flex items-center w-fit bg-white border border-blue-950 text-blue-950 rounded-3xl px-3 py-1">
                    <IoIosCall /> {hotel.phone}
                  </button>
                  <button className="bg-white rounded-full border border-blue-950 p-2">
                    <TbShare3 />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelList;
