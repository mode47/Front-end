import React, { useState } from 'react'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import LoginPopup from './components/LoginPopup/LoginPopup'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import MyOrders from './pages/MyOrders/MyOrders'

const App = () => {

  const [showLogin,setShowLogin] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);


  return (
    <>
    {showLogin?<LoginPopup 
     setIsLoggedIn={setIsLoggedIn}
    setShowLogin={setShowLogin}/>:<></>}
      <div className='app'>
        <Navbar 
         isLoggedIn={isLoggedIn}
         setIsLoggedIn={setIsLoggedIn}
        setShowLogin={setShowLogin}/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/order' element={<PlaceOrder/>}/>
          <Route path='/myorder' element={<MyOrders/>}/>
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
