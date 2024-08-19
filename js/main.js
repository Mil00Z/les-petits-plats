import { recipes } from "../datas/recipes.js";
import { RecipeCard } from "./templates/recipeCard.js";

const currentPage = 'home';

if (document.body.classList.contains(`${currentPage}`)) {

        // console.log(`on ${currentPage} - Page`);

        displayRecipe(recipes);

  
        // Remove Tag         
        document.querySelector('.recipes-filter').addEventListener('click', (e) => {                  
        
        if (e.target.classList.contains('fa-solid')) {
                
                e.target.parentElement.remove();                 

                }                          
        });

        // All Number of Recipes
        document.querySelector('.recipes-counter .count').textContent = recipes.length;

}





function displayRecipe(arrayElement){

        arrayElement.forEach((recipe) =>{
                
                const cardRecipe = new RecipeCard(recipe.name,recipe.description,recipe.time,recipe.image,recipe.ingredients,recipe.id);
    
                cardRecipe.createCard(recipe);
    
            });

        
}