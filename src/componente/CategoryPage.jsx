import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RecipeDetails from './RecipeDetails';

function CategoryPage() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const { categoryName } = useParams();

  useEffect(() => {
    fetchRecipesByCategory(categoryName);
  }, [categoryName]);

  const fetchRecipesByCategory = async (category) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const data = await response.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.error('Fehler beim Abrufen der Rezepte:', error);
    }
  };

  const handleRecipeClick = (mealId) => {
    setSelectedRecipe(mealId);
  };

  const handleBackToList = () => {
    setSelectedRecipe(null);
  };

  if (selectedRecipe) {
    return <RecipeDetails mealId={selectedRecipe} onBack={handleBackToList} />;
  }

  return (
    <div className="category-page">
      <h2>Rezepte in der Kategorie: {categoryName}</h2>
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <div 
            key={recipe.idMeal} 
            className="recipe-card" 
            onClick={() => handleRecipeClick(recipe.idMeal)}
          >
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            <h3>{recipe.strMeal}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;