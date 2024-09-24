import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

function Home() {
  const [categories, setCategories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

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

  const handleSearch = async (searchTerm) => {
    if (searchTerm.length > 0) {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchTerm[0]}`
        );
        const data = await response.json();
        setSearchResults(data.meals || []);
      } catch (error) {
        console.error("Fehler bei der Suche:", error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="home">
      <SearchBar onSearch={handleSearch} />
      {searchResults.length > 0 ? (
        <div className="search-results">
          <h3>Suchergebnisse</h3>
          <div className="recipe-grid">
            {searchResults.map((recipe) => (
              <Link
                key={recipe.idMeal}
                to={`/recipe/${recipe.idMeal}`}
                className="recipe-item"
              >
                <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                <span>{recipe.strMeal}</span>
              </Link>
            ))}
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
}

export default Home;