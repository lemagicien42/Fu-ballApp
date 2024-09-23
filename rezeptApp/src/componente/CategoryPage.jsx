import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function CategoryPage() {
  const [recipes, setRecipes] = useState([]);
  const { categoryName } = useParams();

  useEffect(() => {
    fetchRecipesByCategory(categoryName);
  }, [categoryName]);

  const fetchRecipesByCategory = async (category) => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      const data = await response.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.error("Fehler beim Abrufen der Rezepte:", error);
    }
  };

  return (
    <div>
      <h2>Rezepte in der Kategorie: {categoryName}</h2>
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <div key={recipe.idMeal} className="recipe-item">
            <h3>{recipe.strMeal}</h3>
            <img src={recipe.strMealThumb + "/preview"} alt={recipe.strMeal} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;
