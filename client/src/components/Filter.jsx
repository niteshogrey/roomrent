import { FaSearch } from "react-icons/fa";

function Filter() {
  return (
    <div className="flex flex-col gap- w-[%] ">
      <h1 className=" font-semibold text-xl ">
        Search results for <b>London</b>
      </h1>
      <div className="top">
        <div className="flex flex-col gap-1 ">
          <label className="text-sm font-semibold" htmlFor="city">Location</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City Location"
            className="w-[100%] px-5 py-2 border rounded-md "
          />
        </div>
      </div>
      <div className="bottom flex justify-between gap-2">
        <div className="flex flex-col gap-1 ">
          <label className="text-sm font-semibold" htmlFor="type">Type</label>
          <select name="type" id="type" className="w-[150px] p-2 border rounded-md">
            <option value="">any</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>
        <div className="flex flex-col gap-1 ">
          <label className="text-sm font-semibold" htmlFor="property">Property</label>
          <select name="property" id="property" className="w-[150px] p-2 border rounded-md ">
            <option value="">any</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="land">Land</option>
          </select>
        </div>
        <div className="flex flex-col gap-1 ">
          <label className="text-sm font-semibold" htmlFor="bedroom">Bedroom</label>
          <select name="room" id="room" className="w-[150px] p-2 border rounded-md ">
            <option value="">any</option>
            <option value="single_room">Single Room</option>
            <option value="1BHK">1BHK</option>
            <option value="2BHK">2BHK</option>
            <option value="3BHK">3BHK</option>
          </select>
        </div>
        <div className="flex flex-col gap-1 ">
          <label className="text-sm font-semibold" htmlFor="minPrice">Min Price</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            placeholder="any"
            className="w-[150px] p-2 border rounded-md "
          />
        </div>
        <div className="flex flex-col gap-1 ">
          <label className="text-sm font-semibold" htmlFor="maxPrice">Max Price</label>
          <input
            type="text"
            id="maxPrice"
            name="maxPrice"
            placeholder="any"
            className="w-[150px] p-2 border rounded-md "
          />
        </div>
        <div className="mt-5">
        <button className="bg-red-400 w-10 p-1 h-10">
          <FaSearch className="text-3xl items-center"/>
        </button>
        </div>
      </div>
    </div>
  );
}

export default Filter;