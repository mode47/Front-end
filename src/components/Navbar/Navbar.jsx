import React, { useContext, useState } from 'react'
import  './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios';
const Navbar = ({isLoggedIn, setIsLoggedIn,setShowLogin}) => {

  const [menu,setMenu] = useState("home");
  const {getTotalCartAmount} = useContext(StoreContext);
  const handleLogout = async () => {
    try {
      const response = await axios.get('http://localhost:3000/auth/logout', {
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.status === 200) {
        setIsLoggedIn(false); // Update the state
        alert('Logged out successfully!');
        console.log('Logged out successfully!');
      } else {
        alert('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      alert(error.response?.data?.message || 'An error occurred while logging out.');
    }
  };
  
  return (
    <div className='navbar'>
      <Link to='/'><img className='logo' src={assets.logo1} alt="" /></Link>
      <ul className="navbar-menu">
        <Link to="/" onClick={()=>setMenu("home")} className={`${menu==="home"?"active":""}`}>home</Link>
        <a href='#explore-menu' onClick={()=>setMenu("menu")} className={`${menu==="menu"?"active":""}`}>menu</a>
        <a href='#app-download' onClick={()=>setMenu("mob-app")} className={`${menu==="mob-app"?"active":""}`}>mobile app</a>
        <a href='#footer' onClick={()=>setMenu("contact")} className={`${menu==="contact"?"active":""}`}>contact us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <Link to='/cart' className='navbar-search-icon'>
          <img src={assets.basket_icon} alt="" />
          <div className={getTotalCartAmount()>0?"dot":""}></div>
        </Link>
        {/* <button onClick={()=>setShowLogin(true)}>sign in</button> */}
        {isLoggedIn ? (
          <li>
            <button onClick={handleLogout}>Log Out</button>
          </li>
        ) : (
          <li>
            <button onClick={() => setShowLogin(true)}>Sign In</button>
          </li>
        )}
      </div>
    </div>
  )
}

export default Navbar
