
import HotelRegister from "./pages/HotelRegister";
import './index.css'
import  { Route, Routes } from "react-router-dom"
import Home from "./pages/Home";
import Map from "./components/Map";
import Login from "./pages/Login";



function App() {
  return (
    <div>
    <Routes>
      <Route  path="/register" element = {<HotelRegister/>} />
      <Route  path="/login" element = {<Login/>} />
      <Route  path="/" element = {<Home/>} />
      <Route  path="/map" element = {<Map/>} />

    </Routes>
    </div>
    
  );
}

export default App;
