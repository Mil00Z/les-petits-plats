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

			const minimalQueryLength = 3 ;

            let nameMatching = [];
            let descriptionMatching = [];
            let ingredientMatching = [];

            let resultsMatching = []

                if(e.target.value.length >= minimalQueryLength) {

                    console.log('***searching with this input text =>', e.target.value);


                    for (let recipe in recipes){
    
                        let name = recipes[recipe].name;
                        let description = recipes[recipe].description;
                        let ingredientList = recipes[recipe].ingredients;

                        
                        // Search By
                        if (description.includes(e.target.value)){

                                resultsMatching.push(recipes[recipe]);

                                document.querySelector('.recipes-container').innerHTML = '';

                                displayRecipe(resultsMatching);

                           } else if (name.includes(e.target.value)) {

                                resultsMatching.push(recipes[recipe]);

                                document.querySelector('.recipes-container').innerHTML = '';

                                displayRecipe(resultsMatching);
                                   
                           } else if (ingredientList) {

                            	for (let element in ingredientList) {

								let nameIngredient = ingredientList[element].ingredient;

                                if (nameIngredient.includes(e.target.value)) {

									console.log(nameIngredient)

                                    resultsMatching.push(recipes[recipe]);

									displayRecipe(resultsMatching);

                                } 

                			}

         				   } else {
                            console.warn('no recipes are matching with this search ==', e.target.value);
                        }  

						// Number of recipes matching conditions			    
						 console.log(resultsMatching)

                        updateCounterRecipes(resultsMatching);
					}
			}	

    });


// FINAL	
}





function displayRecipe(arrayElement){

        arrayElement.forEach((recipe) =>{
                
                const cardRecipe = new RecipeCard(recipe.name,recipe.description,recipe.time,recipe.image,recipe.ingredients,recipe.id);
    
                cardRecipe.createCard(recipe);

                console.log(recipe);
    
        });
}

function updateCounterRecipes(datas) {

        document.querySelector(`.count`).textContent = datas.length;

}