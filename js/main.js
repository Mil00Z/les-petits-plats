import { recipes } from "../datas/recipes.js";
import { RecipeCard } from "./templates/recipeCard.js";

const currentPage = 'home';

if (document.body.classList.contains(`${currentPage}`)) {

        console.log(`on ${currentPage} - Page`);

        console.log(recipes);
        
}
