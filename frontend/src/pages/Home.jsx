import HotelList from "../components/HotelList"
import Navbar from "../components/Navbar"
import NavigationBar from "../components/NavigationBar"
import SearchFilterDistrict from "../components/SearchFilterDistrict"


const Home = () => {
  return (
    <div>
        <Navbar/>
        <SearchFilterDistrict/>
        <HotelList/>
        <NavigationBar />
    </div>
  )
}

export default Home