import React, { useState, useEffect } from 'react';

function RecipeDetails({ mealId, onBack }) {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetchRecipeDetails(mealId);
  }, [mealId]);

  const fetchRecipeDetails = async (id) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setRecipe(data.meals[0]);
    } catch (error) {
      console.error('Fehler beim Abrufen der Rezeptdetails:', error);
    }
  };

  if (!recipe) return <div>Laden...</div>;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (recipe[`strIngredient${i}`]) {
      ingredients.push(`${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}`);
    }
  }

  return (
    <div className="recipe-details">
      <button className="back-button" onClick={onBack}>Zurück zur Übersicht</button>
      <h2>{recipe.strMeal}</h2>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <h3>Zutaten:</h3>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Anleitung:</h3>
      <p>{recipe.strInstructions}</p>
    </div>
  );
}

export default RecipeDetails;