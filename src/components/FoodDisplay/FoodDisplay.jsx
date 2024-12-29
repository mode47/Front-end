// import React, {useEffect,useState  , useMemo } from 'react'
// import './FoodDisplay.css'
// import FoodItem from '../FoodItem/FoodItem'
// import { StoreContext } from '../../Context/StoreContext'

// import { useContext } from 'react'

// const FoodDisplay = ({selectedCategory} ) => {
//   console.log("id selectedCategory",selectedCategory);

//   let id=selectedCategory;
//   console.log("i ds",id.
//     selectedCategory
//     );
//   const {food,getFoodData} = useContext(StoreContext);




//   function getfillteredList(){
  
//   return food.filter((item) => item.category_id === selectedCategory.selectedCategory);
//   }

  
//  var filteredList = useMemo(getfillteredList, [selectedCategory, food]);

// console.log("fil",filteredList);
// //  console.log("data,",data);
//   //featcases for
//   // Fetch categories from the backend
//   useEffect(() => {
//     getFoodData();
 
//   }, []);
 
// // console.log("fillterFode",filteredFood);


//   // const {food_list} = useContext(StoreContext);

//   return (
//     <div className='food-display' id='food-display'>
//       <h2>Top dishes near you</h2>
//       <div className='food-display-list'>
//         {filteredList.map((item)=>{
//          return <FoodItem {...item} key={item.id}  />
          
//         })}
//       </div>
//     </div>
//   )
// }

// export default FoodDisplay
import React, { useEffect, useMemo, useContext } from 'react';
import './FoodDisplay.css';
import FoodItem from '../FoodItem/FoodItem';
import { StoreContext } from '../../Context/StoreContext';

const FoodDisplay = ({selectedCategory }) => {
  const { food, getFoodData } = useContext(StoreContext);

  // Fetch food data from the backend
  useEffect(() => {
    getFoodData();
  }, []);

  // Filter food items based on selectedCategory
  const filteredList = useMemo(() => {
    if (selectedCategory === "All") return food;
    return food.filter((item) => item.category_id === selectedCategory);
  }, [selectedCategory, food]);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {filteredList.map((item) => (
          <FoodItem {...item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
