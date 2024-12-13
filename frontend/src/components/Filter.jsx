import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";

function Filter({ onFilteredResults }) {
  const [filters, setFilters] = useState({
    name: "",
    type: "",
    property: "",
    room: "",
    sort: "", // Sort for price sorting
    wifi: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = async () => {
    try {
      const params = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v) // Remove empty fields
      );

      const response = await axios.get("http://localhost:8000/api/v1/hotels/filter", {
        params,
      });
      const filtered = response.data.data;
      onFilteredResults(filtered); // Pass data back to the parent
    } catch (error) {
      console.error("Error fetching filtered hotels:", error);
    }
  };

  return (
    <div className="px-4 flex flex-col gap-0 w-full">
      <h1 className="font-semibold text-xl">
        Search results for <b>{filters.name || "all"}</b>
      </h1>
      <div className="top">
        <div className="flex flex-col gap-1">
          <input
            type="text"
            id="name"
            name="name"
            value={filters.name}
            onChange={handleChange}
            placeholder="Search for rooms, flats, etc."
            className="w-full px-5 py-2 border rounded-md"
          />
        </div>
      </div>
      <div className="bottom w-full flex justify-between">
        <div className="flex flex-col">
          <label className="text-sm font-semibold" htmlFor="type">
            Type
          </label>
          <select
            name="type"
            id="type"
            value={filters.type}
            onChange={handleChange}
            className="w-[150px] p-2 border rounded-md"
          >
            <option value="">any</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold" htmlFor="property">
            Bed
          </label>
          <select
            name="property"
            id="property"
            value={filters.property}
            onChange={handleChange}
            className="w-[150px] p-2 border rounded-md"
          >
            <option value="">any</option>
            <option value="apartment">1Bed</option>
            <option value="house">2Bed</option>
            <option value="land">3Bed</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold" htmlFor="room">
            Bedroom
          </label>
          <select
            name="room"
            id="room"
            value={filters.room}
            onChange={handleChange}
            className="w-[150px] p-2 border rounded-md"
          >
            <option value="">any</option>
            <option value="single_room">Single Room</option>
            <option value="1BHK">1BHK</option>
            <option value="2BHK">2BHK</option>
            <option value="3BHK">3BHK</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold" htmlFor="sort">
            Price
          </label>
          <select
            name="sort"
            id="sort"
            value={filters.sort}
            onChange={handleChange}
            className="w-[150px] p-2 border rounded-md"
          >
            <option value="">any</option>
            <option value="lowToHigh">Low To High</option>
            <option value="highToLow">High To Low</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold" htmlFor="Wifi">
            WiFi
          </label>
          <select
            name="wifi"
            id="wifi"
            value={filters.wifi}
            onChange={handleChange}
            className="w-[150px] p-2 border rounded-md"
          >
            <option value="">any</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="mt-5">
          <button onClick={applyFilters} className="bg-red-400 w-10 p-1 h-10">
            <FaSearch className="text-3xl items-center" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Filter;
