const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const hotelRoute = require("./routes/hotelRoute");
const cors = require('cors');
const connectCloudinary = require("./config/cloudinary");
const userRoute = require("./routes/userRoute");



//configuration

dotenv.config();
connectCloudinary()

const app = express();
const PORT = process.env.PORT || 4000;
const MONGOURL = process.env.MONGO_URL;

// Enable CORS for all route
app.use(cors());

// Middleware to parse incoming requests
app.use(bodyParser.json());

// Database connection
mongoose.connect(MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((error) => {
        console.log("Connection error:", error);
    });

// Routes
app.use("/api/v1/hotels", hotelRoute);
app.use("/api/v1/user", userRoute);


// Server start
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
