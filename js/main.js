import { recipes } from "../datas/recipes.js";
import { RecipeCard } from "./templates/recipeCard.js";

const currentPage = 'home';

if (document.body.classList.contains(`${currentPage}`)) {

        displayRecipe(recipes);

        updateCounterRecipes(recipes);

  
        // Remove Tag         
        document.querySelector('.recipes-filter').addEventListener('click', (e) => {                  
        
        if (e.target.classList.contains('fa-solid')) {
                
                e.target.parentElement.remove();                 

                }                          
        });

       

        document.querySelector('#search').addEventListener('input',(e) => {

                let nameMatching = [];
                let descriptionMatching = [];
                let ingredientMatching = [];

                let resultsMatching = []

                if(e.target.value.length >= 3) {

                        console.log('***searching with this input text =>', e.target.value);


                        for (let recipe in recipes){
    
                        let name = recipes[recipe].name;
                        let description = recipes[recipe].description;
                        let ingredient = recipes[recipe].ingredients.ingredient;

                        // Search By
                        if (description.includes(e.target.value)){

                                resultsMatching.push(recipes[recipe]);

                                document.querySelector('.recipes-container').innerHTML = '';

                                // console.log(resultsMatching);

                                displayRecipe(resultsMatching);


                           } else if (name.includes(e.target.value)) {

                                resultsMatching.push(recipes[recipe]);

                                document.querySelector('.recipes-container').innerHTML = '';

                                // console.log(resultsMatching);

                                displayRecipe(resultsMatching);
                                   
                           }
                           
                        //    else {

                        //         console.warn('no recipes matching with this sequence ::', e.target.value);

                        //       }
                        
                        }

                        console.log(resultsMatching);

                        updateCounterRecipes(resultsMatching);

                }

                

        });

}





function displayRecipe(arrayElement){

        arrayElement.forEach((recipe) =>{
                
                const cardRecipe = new RecipeCard(recipe.name,recipe.description,recipe.time,recipe.image,recipe.ingredients,recipe.id);
    
                cardRecipe.createCard(recipe);
    
        });
}

function updateCounterRecipes(datas) {

        document.querySelector(`.count`).textContent = datas.length;

}