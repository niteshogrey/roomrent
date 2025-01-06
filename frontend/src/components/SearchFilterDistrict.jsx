import { useState } from "react";
import { MdOutlineMyLocation } from "react-icons/md";
import { RxMixerHorizontal } from "react-icons/rx";
import { FaSearchLocation } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaBed, FaWifi } from "react-icons/fa";
import { MdMeetingRoom } from "react-icons/md";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { findNearestHotels, filterHotels } from "../features/hotels/hotelsAPI";


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

const SearchFilterDistrict = () => {
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [search, setSearch] = useState("");
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [filters, setFilters] = useState({
    bed: "",
    room: "",
    sort: "",
    wifi: "",
  });

  const dispatch = useDispatch();

  const handleFilterClick = (type, value) => {
    const updatedFilters = {
      ...filters,
      [type]: value,
    };

    setFilters(updatedFilters); // Update local state

    // Dispatch filterHotels thunk immediately
    dispatch(filterHotels(updatedFilters))
      .unwrap()
      .then((data) => {
        console.log("Filtered hotels:", data);
        // Handle filtered data (e.g., update state or UI)
      })
      .catch((error) => {
        console.error("Error applying filters:", error);
      });
  };

  const handleFilterApply = () => {
    const updatedFilters = {
      ...filters,
      name: search.trim(), // Include search term in the filters
      district: selectedDistrict || undefined,
    };

    // Dispatch the filterHotels thunk with the filters
    dispatch(filterHotels(updatedFilters))
      .unwrap()
      .then((data) => {
        console.log("Filtered hotels:", data);
        // Handle filtered data (e.g., update state or UI)
      })
      .catch((error) => {
        console.error("Error applying filters:", error);
      });
  };

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
  
    if (district) {
      const updatedFilters = {
        ...filters,
        district, // Update filters with the selected district
      };
  
      // Dispatch the filterHotels thunk immediately
      dispatch(filterHotels(updatedFilters))
        .unwrap()
        .then((data) => {
          console.log("Filtered data for district:", district, data);
          // Update the state or UI with the filtered data
        })
        .catch((error) => {
          console.error("Error fetching data for district:", district, error);
        });
    }
  };;

  const handleSearch = () => {
    handleFilterApply(); // Trigger the search and apply filters
  };


  const getLocation = ({onNearbyData}) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
           // Dispatch the thunk with geolocation data
           dispatch(
            findNearestHotels({
              latitude,
              longitude,
              maxDistance: 100, // Adjust as needed
            })
          ).unwrap() // Waits for the result
            .then((data) => {
              if (onNearbyData) {
                onNearbyData(data);
              }
            })
            .catch((error) => {
              console.error('Error fetching nearby rentals:', error);
            });
        },
        (error) => alert('Error fetching location: ' + error.message)
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div>
    {/* Desktop View */}
    <div className="bg-gray-200 px-4 py-2 shadow-md hidden md:block">
      <div className="flex items-center justify-center space-x-2">
      <select
  className="bg-gray-200 px-3 py-2 rounded text-sm md:px-3 md:py-2 md:text-base"
  value={selectedDistrict}
  onChange={handleDistrictChange} // Handles the selection and triggers data fetch
>
  <option value="">Select District</option>
  {districts.map((district) => (
    <option key={district} value={district}>
      {district}
    </option>
  ))}
</select>
  
        <div className="flex w-full md:w-[880px] h-10 md:h-12 rounded-full border border-black bg-white items-center mt-2 md:mt-0">
          <button
            onClick={getLocation}
            className="flex items-center h-full px-2 py-1 w-32 md:w-32 text-xs md:text-sm text-gray-500 hover:text-black"
          >
            <MdOutlineMyLocation className="mr-1" />
            Find Near Me
          </button>
  
          <input
            type="text"
            placeholder="Search for rooms, flats, etc."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-grow h-full px-2 py-1 text-sm md:text-base text-black border-x border-black focus:ring-2 focus:ring-blue-300"
          />
         {/* filter  */}
          <div className="relative">
            <button
              onClick={() => setIsFiltersVisible(!isFiltersVisible)}
              className="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm flex items-center text-gray-500 hover:text-black"
            >
              <RxMixerHorizontal className="mr-1 md:mr-2" />
              Filters
            </button>
            {isFiltersVisible && (
                <div className="absolute top-12 right-0 w-56 md:w-80 bg-white shadow-2xl rounded-md p-3 md:p-4 z-10">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center gap-2">
                      <FaBed className="text-2xl"/>:

                      <button
                        onClick={() => handleFilterClick("bed", "1Bed")}
                        className={`w-16 p-1 rounded-full text-blue-950 cursor-pointer ${
                          filters.bed === "1Bed" ? "border border-blue-950 font-bold bg-blue-200" : "border"
                        }`}>
                        1 Bed
                      </button>
                      <button
                       onClick={() => handleFilterClick("bed", "2Bed")}
                       className={`w-16 p-1 rounded-full text-blue-950 cursor-pointer ${
                        filters.bed === "2Bed" ? "border border-blue-950 font-bold bg-blue-200" : "border"
                      }`}>
                        2 Bed
                      </button>
                      <button
                          onClick={() => handleFilterClick("bed", "3Bed")}
                          className={`w-16 p-1 rounded-full text-blue-950 cursor-pointer ${
                           filters.bed === "3Bed" ? "border border-blue-950 font-bold bg-blue-200" : "border"
                         }`}>
                        3 Bed
                      </button>
                    </div>
                    <div className="flex gap-2 ">
                    <MdMeetingRoom className="text-2xl"/>:
                      <button
                        onClick={() => handleFilterClick("room", "Single Room")}
                       className={`w-28 p-1 rounded-full text-blue-950 cursor-pointer ${
                        filters.room === "Single Room" ? "border border-blue-950 font-bold bg-blue-200" : "border"
                      }`}>
                        Single Room
                      </button>
                      <button
                        onClick={() => handleFilterClick("room", "1BHK")}
                        className={`w-16 p-1 rounded-full text-blue-950 cursor-pointer ${
                         filters.room === "1BHK" ? "border border-blue-950 font-bold bg-blue-200" : "border"
                       }`}>
                        1BHK
                      </button>
                      <button
                        onClick={() => handleFilterClick("room", "2BHK")}
                        className={`w-16 p-1 rounded-full text-blue-950 cursor-pointer ${
                         filters.room === "2BHK" ? "border border-blue-950 font-bold bg-blue-200" : "border"
                       }`}>
                        2BHK
                      </button>
                    </div>
                    <div className="flex gap-2">
                    <FaIndianRupeeSign className="text-2xl"/>:
                      <button
                        onClick={() => handleFilterClick("sort", "lowToHigh")}
                        className={`w-28 p-1 rounded-full text-blue-950 cursor-pointer ${
                         filters.sort === "lowToHigh" ? "border border-blue-950 font-bold bg-blue-200" : "border"
                       }`}>
                        Low to High
                      </button>
                      <button
                        onClick={() => handleFilterClick("sort", "highToLow")}
                        className={`w-28 p-1 rounded-full text-blue-950 cursor-pointer ${
                         filters.sort === "highToLow" ? "border border-blue-950 font-bold bg-blue-200" : "border"
                       }`}>
                        High to Low
                      </button>
                    </div>
                    <div className="flex gap-2">
                    <FaWifi className="text-2xl"/>:
                      <button
                        onClick={() => handleFilterClick("wifi", "Yes")}
                        className={`w-16 p-1 rounded-full text-blue-950 cursor-pointer ${
                         filters.wifi === "Yes" ? "border border-blue-950 font-bold bg-blue-200" : "border"
                       }`}>
                        Yes
                      </button>
                      <button
                        onClick={() => handleFilterClick("wifi", "No")}
                        className={`w-16 p-1 rounded-full text-blue-950 cursor-pointer ${
                         filters.wifi === "No" ? "border border-blue-950 font-bold bg-blue-200" : "border"
                       }`}>
                        No
                      </button>
                    </div>
                  </div>
                  
                </div>
              )}
          </div>
  
          <div className="flex items-center rounded-e-full h-full w-10 md:w-[51px] bg-blue-950">
            <button onClick={handleSearch} className="w-full p-2 h-10 flex items-center">
              <FaSearch className="text-xl text-white md:text-3xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  
    {/* Mobile View */}
    <div className="lg:hidden">
      {/* Search Input */}
      <div className="mt-16 h-14 w-full flex flex-col justify-center items-center">
        <div className="w-80 rounded-full border-2 border-blue-950 flex items-center">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for rooms, flats, etc."
            className="placeholder-blue-950 w-[270px] h-12 rounded-s-full p-5 bg-transparent"
          />
          <button onClick={handleSearch} className="text-3xl ml-2 text-blue-950">
            <FaSearchLocation />
          </button>
        </div>
      </div>
  
      {/* Find Near & District */}
      <div className="w-full h-14 mt-2 gap-5 flex justify-center items-center">
        <button onClick={getLocation} className="flex items-center justify-center h-10 border rounded-full border-blue-950 px-2 py-1 w-32 md:w-48 text-xs md:text-sm text-blue-950 hover:text-black">
          <MdOutlineMyLocation className="mr-1" />
          Find Near Me
        </button>
        <select value={selectedDistrict}
  onChange={handleDistrictChange}  className="h-10 border rounded-full border-blue-950 px-2 py-1 w-32 md:w-48 text-xs md:text-sm text-blue-950 bg-transparent hover:text-black">
          <option value="">Select District</option>
          {districts.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>
      </div>
  
      {/* Search by Filter */}
      <div className="flex justify-center items-center h-48 w-full">
        <div className="h-44 w-96 bg-gray-200 flex flex-col justify-center items-center space-y-4 rounded-2xl border border-blue-950">
          <h4 className="text-lg font-semibold text-blue-950">
            Search By Filter
          </h4>
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <select  value={filters.bed}
          onChange={(e) => handleFilterClick("bed", e.target.value)} className="h-8 border font-semibold rounded-full border-blue-950 px-4 py-1 w-36 md:w-48 text-xs md:text-sm text-blue-950 hover:text-black">
              <option value="">Bed</option>
              <option value="1Bed">1 Bed</option>
              <option value="2Bed">2 Bed</option>
              <option value="3Bed">3 Bed</option>
            </select>
            <select  value={filters.room}
          onChange={(e) => handleFilterClick("room", e.target.value)} className="h-8 border font-semibold rounded-full border-blue-950 px-4 py-1 w-36 md:w-48 text-xs md:text-sm text-blue-950 hover:text-black">
              <option value="">Room</option>
              <option value="1BHK">1BHK</option>
              <option value="2BHK">2BHK</option>
              <option value="3BHK">3BHK</option>
            </select>
            <select  value={filters.sort}
          onChange={(e) => handleFilterClick("sort", e.target.value)} className="h-8 border font-semibold rounded-full border-blue-950 px-4 py-1 w-36 md:w-48 text-xs md:text-sm text-blue-950 hover:text-black">
              <option value="">Price</option>
              <option value="lowToHigh">Low to High</option>
              <option value="highToLow">High to Low</option>
            </select>
            <select  value={filters.wifi}
          onChange={(e) => handleFilterClick("wifi", e.target.value)} className="h-8 border font-semibold rounded-full border-blue-950 px-4 py-1 w-36 md:w-48 text-xs md:text-sm text-blue-950 hover:text-black">
              <option value="">Wifi</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default SearchFilterDistrict;