import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);
import axios from 'axios'

const StoreContextProvider = (props) => {

    const [cartItems,setCartItems] = useState({});
    const [ordersData,setOrdersData] = useState({});
    const [categoriesData,setCategoriesData]=useState([]);   
    const [food,setFood] = useState([]);   



    
    const getCategories = async() =>{
            try {
                    const response = await axios.get('http://localhost:3000/category');
                    console.log("Fetched categories:", response.data);
                    setCategoriesData(response.data);
                  } catch (err) {
                    console.error("Error fetching categories:", err.message);
                  }
        }

                const getFoodData = async()=>{
                        try {
                            const response = await axios.get('http://localhost:3000/food');
                            console.log("Fetched foods :", response.data);
                            setFood(response.data);
                        } catch (err) {
                            console.error("Error fetching foods:", err.message);
                        }
}




    const addToCart = (itemId) =>{
        if(!cartItems[itemId])
        {
            setCartItems((prev)=>({...prev,[itemId]:1}));
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        }
    }

    const removeFromCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }
    
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
          if (cartItems[item] > 0) {
            let itemInfo = food.find((product) => product.id === Number(item));
            totalAmount += itemInfo.price * cartItems[item];
          }
        }
        return totalAmount;
      }

    const placeOrder = (deliveryData) =>{

        console.log(deliveryData);
    }

    const contextValue = {
     
        categoriesData,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        placeOrder,
        getCategories,
        getFoodData,
        food,
        
        
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
        )

}


export default StoreContextProvider;