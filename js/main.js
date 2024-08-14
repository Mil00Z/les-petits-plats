import { recipes } from "../datas/recipes.js";
import { RecipeCard } from "./templates/recipeCard.js";

const currentPage = 'home';

if (document.body.classList.contains(`${currentPage}`)) {

        console.log(`on ${currentPage} - Page`);

        recipes.forEach((recipe,index) =>{
                
           console.log(recipe);

            const cardRecipe = new RecipeCard(recipe.name,recipe.description,recipe.time,recipe.image,recipe.id);

            cardRecipe.createCard(recipe);

        });
        
}
