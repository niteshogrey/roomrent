const hotelService = require("../services/hotelService");

const createHotel = async (req, res) => {
    try {
      const { body, files } = req;
  
      // Prepare hotel data
      const hotelData = {
        name: body.name,
        phone: body.phone,
        price: body.price,
        room: body.room,
        address: {
          address1: body.address1,
          district: body.district,
          state: body.state,
        },
        bed: body.bed,
        wifi: body.wifi,
        furnished: body.furnished,
        location: {
          type: "Point",
          coordinates: [parseFloat(body.longitude), parseFloat(body.latitude)],
        },
      };
  
      // Create a new hotel entry
      const newHotel = await hotelService.createHotel(hotelData, files);
      res.status(201).json({ msg: "Hotel created successfully", success: true, data: newHotel });
    } catch (error) {
      console.error("Error creating hotel:", error.message);
      res.status(500).json({ error: "Internal server error", details: error.message });
    }
  };
  

const getAllHotels = async (req, res) => {
  try {
    const hotels = await hotelService.getAllHotels();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving hotels", error });
  }
};

const findNearestHotels = async (req, res) => {
  const { latitude, longitude, maxRadius = 1000 } = req.body;
  try {
    const hotels = await hotelService.findNearestHotels(latitude, longitude, maxRadius);
    res.status(200).json({ success: true, msg: "Nearby hotels found", data: hotels });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const filterHotels = async (req, res) => {
  const { name, bed,  district, minPrice, maxPrice, room, wifi, sort } = req.query;
  const filter = {};
  const sortOption = {};

  if (name) {
    filter.$or = [
      { name: { $regex: name, $options: "i" } },
      { "address.address1": { $regex: name, $options: "i" } },
    ];
  }
  if (district) {
    filter["address.district"] = { $regex: new RegExp(district, "i") }; // Case-insensitive match
  }
  if(bed) filter.bed = bed;
  if (room) filter.room = room;
  if (wifi) filter.wifi = wifi;
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = parseFloat(minPrice);
    if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
  }
  if (sort) {
    sortOption.price = sort === "lowToHigh" ? 1 : -1;
  }

  try {
    const hotels = await hotelService.filterHotels(filter, sortOption);
    res.status(200).json({ success: true, data: hotels });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error filtering hotels", error: error.message });
  }
};


const getOneHotel = async (req, res) => {
  try {
    const hotel = await hotelService.getOneHotelByPhone(req.params.phone);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving hotel", error });
  }
};


const updateHotel = async (req, res) => {
  const { phone } = req.params;
  try {
    const updatedHotel = await hotelService.updateHotelByPhone(phone, req.body);
    if (!updatedHotel) return res.status(404).json({ success: false, message: "Hotel not found" });

    res.status(200).json({ success: true, message: "Hotel updated successfully.", data: updatedHotel });
  } catch (error) {
    res.status(500).json({ success: false, message: "Unable to update hotel.", error: error.message });
  }
};

const deleteHotel = async (req, res) => {
  const { phone } = req.params;
  try {
    const deletedHotel = await hotelService.deleteHotelByPhone(phone);
    if (!deletedHotel) return res.status(404).json({ success: false, message: "Hotel not found" });

    res.status(200).json({ success: true, message: "Hotel deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Unable to delete hotel.", error: error.message });
  }
};

module.exports = {
  createHotel,
  getAllHotels,
  getOneHotel,
  findNearestHotels,
  filterHotels,
  updateHotel,
  deleteHotel,
};
