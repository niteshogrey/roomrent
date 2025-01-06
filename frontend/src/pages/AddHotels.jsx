import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import  {createHotel}  from "../features/hotels/hotelsAPI"; // Import the Redux action

const AddHotels = () => {
  const [hotel, setHotel] = useState({
    name: "",
    phone: "",
    address1: "",
    district: "",
    state: "",
    bed: "none",
    price: "",
    room: "",
    wifi: "No",
    furnished: "No",
    latitude: null,    longitude: null,
  });

  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!hotel.name) newErrors.name = "Name is required";
    if (!hotel.phone) newErrors.phone = "Phone is required";
    if (!hotel.address1) newErrors.address1 = "Address Line 1 is required";
    if (!hotel.district) newErrors.district = "District is required";
    if (!hotel.state) newErrors.state = "State is required";
    if (!hotel.price) newErrors.price = "Price is required";
    if (!hotel.room) newErrors.room = "Room type is required";
    if (images.length === 0) newErrors.images = "At least one image is required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotel((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setHotel((prev) => ({ ...prev, latitude, longitude }));
          alert("Location retrieved successfully!");
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to retrieve location.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setLoading(true);
    console.log("Hotel data before dispatch:", hotel);
    console.log("Images data before dispatch:", images);

    try {
      // Dispatch the createHotel action
      await dispatch(createHotel({ hotel, images }));

      alert(`Hotel "${hotel.name}" added successfully!`);
      navigate("/");
      setHotel({
        name: "",
        phone: "",
        address1: "",
        district: "",
        state: "",
        bed: "",
        price: "",
        room: "",
        wifi: "No",
        furnished: "No",
        latitude: null,
        longitude: null,
      });
      setImages([]);
      setErrors({});
    } catch (error) {
      console.error("Error adding hotel:", error.message);
      alert(`Error adding hotel: ${error.response?.data?.msg || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-md rounded-md p-6"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Add New Hotel</h2>

        {loading && <p className="text-center text-gray-600">Loading...</p>}
        {errors.general && <p className="text-center text-red-500">{errors.general}</p>}

        <div className="mb-4">
          <input
            type="text"
            name="name"
            placeholder="Enter Title"
            value={hotel.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="phone"
            placeholder="Enter Contact Number"
            value={hotel.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.phone && <p className="text-red-500">{errors.phone}</p>}
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="address1"
            placeholder="Enter Address Line 1"
            value={hotel.address1}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.address1 && <p className="text-red-500">{errors.address1}</p>}
        </div>
        <div className="mb-4 flex gap-2">
          <div className="flex-1">
            <input
              type="text"
              name="district"
              placeholder="Enter District"
              value={hotel.district}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.district && <p className="text-red-500">{errors.district}</p>}
          </div>
          <div className="flex-1">
            <input
              type="text"
              name="state"
              placeholder="Enter State"
              value={hotel.state}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.state && <p className="text-red-500">{errors.state}</p>}
          </div>
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={hotel.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.price && <p className="text-red-500">{errors.price}</p>}
        </div>
        <div className="mb-4 flex gap-2">
          <div className="flex-1">
            <label className="block text-gray-700">Bed</label>
            <select
              name="bed"
              value={hotel.bed}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="none">None</option>
              <option value="1Bed">1Bed</option>
              <option value="2Bed">2Bed</option>
              <option value="3Bed">3Bed</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-gray-700">Room Type</label>
            <select
              name="room"
              value={hotel.room}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="Select Room Type">Select</option>
              <option value="Single Room">Single Room</option>
              <option value="1BHK">1BHK</option>
              <option value="2BHK">2BHK</option>
            </select>
            {errors.room && <p className="text-red-500">{errors.room}</p>}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Wifi</label>
          <select
            name="wifi"
            value={hotel.wifi}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Furnished</label>
          <select
            name="furnished"
            value={hotel.furnished}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Images</label>
          <input
            type="file"
            name="images"
            multiple
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.images && <p className="text-red-500">{errors.images}</p>}
        </div>
        <div className="mb-4 flex justify-between">
          <button
            type="button"
            onClick={getLocation}
            className="w-1/2 bg-green-500 text-white p-2 rounded-md"
          >
            Use My Location
          </button>
          <button
            type="submit"
            className="w-1/2 bg-blue-500 text-white p-2 rounded-md"
          >
            Create Hotel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddHotels;
