import { recipes } from "../datas/recipes.js";
import { RecipeCard } from "./templates/recipeCard.js";

// Sandbox of Results
// Sandbox of Results
let recipesList = [...recipes];
let resultsMatching = [];
let resultTags = {};

const currentPage = 'home';

if (document.body.classList.contains(`${currentPage}`)) {


    displayRecipe(recipesList);

    counterRecipes(recipesList);

    // Search Bar Feature
    document.querySelector('#main-search').addEventListener('input',(e) => {

		const minimalQueryLength = 3 ;
        let searchValue = e.target.value.toLowerCase();

        // SearchBar Clear => display all of datas
        if(searchValue === "") {

            displayRecipe(recipesList);

            return ;
        }

        if(searchValue.length >= minimalQueryLength) {

            resultsMatching = [];

            for (let recipe in recipesList) {

            console.log(recipe);
    
            let name = recipesList[recipe].name.toLowerCase();
            let description = recipesList[recipe].description.toLowerCase();
            let ingredientList = recipesList[recipe].ingredients;

                    
                // Search By name
                if (name.includes(searchValue)) {
                    
                    // If not already in the results
                    if(resultsMatching.indexOf(recipesList[recipe]) === -1){

                        resultsMatching.push(recipesList[recipe]);

                    } 
                   
                // Search By Description
                } else if (description.includes(searchValue)) {

                    if(resultsMatching.indexOf(recipesList[recipe]) === -1){

                        resultsMatching.push(recipesList[recipe]);

                    } 

                // Search By Ingredients Entries
                } else if (ingredientList) {

                    for (let element in ingredientList) {

                        let nameIngredient = ingredientList[element].ingredient.toLowerCase();

                        if (nameIngredient.includes(searchValue)) {

                            if(resultsMatching.indexOf(recipesList[recipe]) === -1){

                                resultsMatching.push(recipesList[recipe]);

                            } 

                        }

                    }

                // No Matching
                } else {

                    console.warn('no recipes are matching with this search ==>', e.target.value,resultsMatching);
                }  
            
            }

            console.log(resultsMatching);

            //Update Results
            updateResults(resultsMatching)
            
            // Display Results 
            displayRecipe(resultsMatching);
	    }
        
    });

    //Tags Feature
    let filtersElement = document.querySelectorAll('.filters');
    
    for (let filter of filtersElement){

        filter.addEventListener('change', (e) => {

            let selectedIngred = e.target.value;
            let parentIngred = e.target.getAttribute('id');

            createTag(selectedIngred,parentIngred);

            for (let subrecipe in recipes){

                let name = recipes[subrecipe].name;
               
                if (name.includes(selectedIngred)) {

                    console.log(name);
                    
                } else {

                    console.log('mismatching selected option')
                    
                }
            }

        });
    }

     // Remove Tags (testing width Highest level of delegation)        
     document.querySelector('.recipes-filter').addEventListener('click', (e) => {                  
        
        if (e.target.classList.contains('fa-solid')) {
                    
                e.target.parentElement.remove();                 
    
                }                          
        });

// FINAL	
}




//FUNCTIONS
function displayRecipe(arrayElement){

    document.querySelector('.recipes-container').innerHTML = '';

    arrayElement.forEach((recipe) =>{
                
                const cardRecipe = new RecipeCard(recipe.name,recipe.description,recipe.time,recipe.image,recipe.ingredients,recipe.id);
    
                cardRecipe.createCard(recipe);

        });

    counterRecipes(arrayElement);

}

function counterRecipes(datas) {

      //Initial Count of Recipes
      document.querySelector('.initial-count').textContent = recipesList.length;

      //Dynamique Count of Recipes
      document.querySelector(`.count`).textContent = datas ? datas.length : 'aucunes';

}


function updateResults(arrayDatas){

    window.localStorage.setItem('results-matching',JSON.stringify(arrayDatas));
}

function createTag(element,parentElement){

    let tag = document.createElement('span');
    tag.classList.add('recipe-tag');
    tag.setAttribute('data-parent',parentElement);

    tag.innerHTML = `
    ${element}
    <i class="fa-solid fa-xmark"></i>
    `
    document.querySelector('.recipe-taglist').appendChild(tag);

}