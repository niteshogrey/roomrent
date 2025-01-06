const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require('cors');
const connectDB = require("./src/config/db");
const connectCloudinary = require("./src/config/cloudinary");
const userRoute = require("./src/routes/userRouter");
const hotelRoute = require("./src/routes/hotelRouter");



//configuration
dotenv.config();
connectCloudinary();
connectDB()

const app = express();
const PORT = process.env.PORT || 4000;

// Enable CORS for all route
app.use(cors());

// Middleware to parse incoming requests
app.use(bodyParser.json());


// Routes
app.use("/api/v1/hotels", hotelRoute);
app.use("/api/v1/user", userRoute);


// Server start
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
