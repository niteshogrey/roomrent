import React, { useState } from 'react'
import HotelList from '../components/HotelList'
import Navbar from '../components/Navbar'
import Map from '../components/Map'
import Filter from '../components/Filter'

const Home = () => {
  const [nearbyData, setNearbyData] = useState([]);
  const [filterData, setFilterData] = useState([]);


  // This function receives data from Navbar and updates state
  const handleNearbyData = (data) => {
    console.log("Updating parent with nearby data:", data.data);
    setNearbyData(data.data); // Ensure the parent state is updated with the array
  };

  const handleFilterData = (filtered) => {
    console.log("Updating parent with Filtered data:", filtered);
    setFilterData(filtered); // Ensure the parent state is updated with the array
  };

  
  return (
    <div className='bg-slate-100 flex flex-col' >
      <div >
        <Navbar onNearbyData={handleNearbyData}/>
      </div>
      <div className='flex flex-row'>
        <div className=' h-full'>
        <Filter onFilteredResults={handleFilterData} />
        <HotelList nearbyHotels={nearbyData} filterHotels = {filterData}/>
        </div>
        {/* <div className='m-10 border border-black rounded-lg w-1/3 h-full'>
        <Map className="rounded-lg"/>
        </div> */}
      </div>
    </div>
  )
}

export default Home