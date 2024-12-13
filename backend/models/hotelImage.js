const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: [true, "Phone number is required"],
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  wifi: {
    type: String,
    default: "No",
  },
  furnished: {
    type: String,
    default: "No",
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      secure_url: {
        type: String,
        required: true,
      },
    },
  ],
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      required: true,
    },
    timestamp: { type: Date, default: Date.now },
  },
});

// Create a geospatial index on the location field
hotelSchema.index({ location: "2dsphere" });

const Hotels = mongoose.model("Hotels", hotelSchema);

module.exports = Hotels;
