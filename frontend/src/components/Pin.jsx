// import React, { useState, useEffect } from "react";
// import { Marker, Popup } from "react-leaflet";
// import { Link } from "react-router-dom";
// import axios from "axios"; // You will need axios for the API request

// const Pin = () => {
//   const [hotels, setHotels] = useState([]); // State to store the fetched hotels
//   const [loading, setLoading] = useState(true); // State for loading state

//   // Fetch hotel data from backend
//   useEffect(() => {
//     const fetchHotels = async () => {
//       try {
//         const response = await axios.get("http://localhost:8000/api/v1/hotels/hotels"); // Your backend endpoint for fetching hotels
//         if (response.data && Array.isArray(response.data.hotels)) {
//           setHotels(response.data.hotels); // Assuming the backend sends an object with 'hotels' key
//         } else {
//           console.error("Expected hotels data not found in response.");
//         }
//         setLoading(false); // Set loading to false after data is fetched
//       } catch (error) {
//         console.error("Error fetching hotel data:", error);
//         setLoading(false);
//       }
//     };

//     fetchHotels();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>; // Loading message while data is being fetched
//   }

//   if (!hotels.length) {
//     return <div>No hotels available</div>; // Show a message if there are no hotels
//   }

//   return (
//     <div>
//       {hotels.map((hotel) => (
//         <Marker key={hotel._id} position={[hotel.latitude, hotel.longitude]}>
//           <Popup>
//             <div>
//               {/* <img src={hotel.images[0]?.url} alt="Hotel" /> Assuming the first image is used */}
//               <div>
//                 {/* <Link to={`/${hotel._id}`}>{hotel.name}</Link> Linking to hotel details page */}
//                 {/* <span>{hotel.room} room</span> */}
//                 {/* <b>{hotel.price}</b> */}
//               </div>
//             </div>
//           </Popup>
//         </Marker>
//       ))}
//     </div>
//   );
// };

// export default Pin;


import React from 'react'
import { Marker, Popup } from 'react-leaflet'

const Pin = () => {
  return (
    <Marker  position={[22.099653, 82.1062098]}>
           <Popup>
             hii
          </Popup>
         </Marker>
  )
}

export default Pin