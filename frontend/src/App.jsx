import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import AddHotels from './pages/AddHotels'

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/addhotel' element={<AddHotels />}/>
        </Routes>
      </BrowserRouter>
    
    </>
  )
}

export default App
