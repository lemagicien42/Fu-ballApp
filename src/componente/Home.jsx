import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

function Home() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      console.error("Fehler beim Abrufen der Kategorien:", error);
    }
  };
  const handleSearch = (searchTerm) => {
    console.log("Suche nach:", searchTerm);
  };

  return (
    <div className="home">
        
      <SearchBar onSearch={handleSearch} />
      <div className="categories">
        <h3>Kategorien</h3>
        <div className="category-grid">
          {categories.map((category) => (
            <Link
              key={category.idCategory}
              to={`/category/${category.strCategory}`}
              className="category-item"
            >
              <img src={category.strCategoryThumb} alt={category.strCategory} />
              <span>{category.strCategory}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
