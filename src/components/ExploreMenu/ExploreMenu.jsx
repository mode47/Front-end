import React, { useContext, useEffect, useState } from 'react';
import './ExploreMenu.css';
import { StoreContext } from '../../Context/StoreContext';
import FoodDisplay from '../FoodDisplay/FoodDisplay';

const ExploreMenu = () => {
  const { categoriesData, getCategories } = useContext(StoreContext);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch categories from the backend
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our menu</h1>
      <p className="explore-menu-text">
        Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
      </p>
      <div className="explore-menu-list">
        {/* "All" Category */}
        <div
          onClick={() => setSelectedCategory("All")}
          className={`explore-menu-list-item ${selectedCategory === "All" ? "active" : ""}`}
        >
          All
        </div>
        {/* Render Other Categories */}
        {categoriesData.map((item, index) => (
          <div
            onClick={() => setSelectedCategory(item.id)}
            key={index}
            className={`explore-menu-list-item ${selectedCategory === item.id ? "active" : ""}`}
          >
            <p>{item.name}</p>
          </div>
        ))}
      </div>
      <hr />
      
      <FoodDisplay selectedCategory={selectedCategory} />
    </div>
  );
 
};

export default ExploreMenu;
