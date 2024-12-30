import React, { useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
const LoginPopup = ({setShowLogin,setIsLoggedIn}) => {

    const [currState,setCurrState] = useState("Sign Up");
    const [username,setUserName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    
    
useEffect(()=>{
    
},[])

    const handleSubmit=async()=> {
        const endpoint =currState==="Login"
        ? "http://localhost:3000/auth/login"
        : "http://localhost:3000/auth/register";
        const params=currState === "Login"
        ? {email, password}
        :{username,email,password};
        
        try{
            const response = await axios.post(endpoint,params,{
                headers: { 'Content-Type': 'application/json' },
            });
            if(response.status===200 && currState === 'Login'){
                console.log("Login successful");
                console.log("response:",response.data);
                setIsLoggedIn(true); // Update the global state
                setIsLoggedIn(true);
                setShowLogin(false);
                 // Close popup or take further action
            }else if (response.status===201 && currState === 'Sign Up') {
                console.log('Sign Up successful');
                alert("Registration successful");
                setIsLoggedIn(true);
                setShowLogin(false);
            }else{
                alert("Unexpected response. Please try again.");

            }
        }catch(error){
            console.error("Error:", error);
            alert(error.response?.data?.message || "An error occurred.");
            

        }
    }   ;


// const handleLogout =async ()=>{
//     try {
//         const response = await axios.get("http://localhost:3000/auth/logout", {}, {
//           headers: { 'Content-Type': 'application/json' },
//         });
    
//         if (response.status === 200) {
//           alert("Logged out successfully");
//           setIsLoggedIn(false);
//         } else {
//           alert("Logout failed. Please try again.");
//         }
//       } catch (error) {
//         console.error("Error during logout:", error);
//         alert(error.response?.data?.message || "An error occurred while logging out.");
//       }
// };
  return (
    <div>
 


      <div className='login-popup'>
        <div className="login-popup-container">
          <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
          </div>
          <div className="login-popup-inputs">
            {currState === "Sign Up" && (
              <input
                type="text"
                placeholder="Your name"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            )}
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={handleSubmit}>
            {currState === "Login" ? "Login" : "Create account"}
          </button>
          <div className="login-popup-condition">
            <input type="checkbox" name="" id="" />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
          {currState === "Login" ? (
            <p>
              Create a new account? <span onClick={() => setCurrState('Sign Up')}>Click here</span>
            </p>
          ) : (
            <p>
              Already have an account? <span onClick={() => setCurrState('Login')}>Login here</span>
            </p>
          )}
        </div>
      </div>
    
  </div>
);
}

export default LoginPopup
