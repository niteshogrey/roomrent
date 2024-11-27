import React, { useState } from 'react';
import Navbar from './Navbar';  // Adjust the import path based on your folder structure

const ParentComponent = () => {
  const [nearbyData, setNearbyData] = useState(null);

  // Function to handle the nearby data passed from Navbar
  const handleNearbyData = (data) => {
    setNearbyData(data);
    console.log('Nearby data:', data);
  };

  return (
    <div>
      {/* Pass the handleNearbyData function as onNearbyData prop */}
      <Navbar onNearbyData={handleNearbyData} />

      {/* Display nearby data */}
      <div className="mt-4">
        {nearbyData ? (
          <pre>{JSON.stringify(nearbyData, null, 2)}</pre>
        ) : (
          <p>No nearby data available</p>
        )}
      </div>
    </div>
  );
};

export default ParentComponent;
