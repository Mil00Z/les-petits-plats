import { recipes } from "../datas/recipes.js";
import { RecipeCard } from "./templates/recipeCard.js";

// Sandbox of Results
let resultsMatching = [];

const currentPage = 'home';

if (document.body.classList.contains(`${currentPage}`)) {

    displayRecipe(recipes);

    updateCounterRecipes(recipes);

    // Search Bar Feature
    document.querySelector('#search').addEventListener('input',(e) => {

		const minimalQueryLength = 3 ;
        let searchValue = e.target.value.toLowerCase();


        // SearchBar Clear => display all of datas
        if(searchValue === "") {

            displayRecipe(recipes);

            return ;

        }


        if(searchValue.length >= minimalQueryLength) {

            for (let recipe in recipes){
    
            let name = recipes[recipe].name.toLowerCase();
            let description = recipes[recipe].description.toLowerCase();
            let ingredientList = recipes[recipe].ingredients;

                        
                // Search By Description
                if (description.includes(searchValue) || name.includes(searchValue)) {

                
                    if(resultsMatching.indexOf(recipes[recipe]) === -1){

                        resultsMatching.push(recipes[recipe]);

                        displayRecipe(resultsMatching);

                    } 

                // Search By Names
                } else if (ingredientList) {

                    for (let element in ingredientList) {

                        let nameIngredient = ingredientList[element].ingredient.toLocaleUpperCase();

                        if (nameIngredient.includes(searchValue)) {

                            if(resultsMatching.indexOf(recipes[recipe]) === -1){

                                resultsMatching.push(recipes[recipe]);
        
                                displayRecipe(resultsMatching);
        
                            } 

                        }
                    }

                } else {

                    console.warn('no recipes are matching with this search ==', e.target.value);
                }  

            }

            displayRecipe(resultsMatching);
	    }	

        console.log(resultsMatching);

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

    updateCounterRecipes(arrayElement);

}

function updateCounterRecipes(datas) {

    document.querySelector(`.count`).textContent = datas.length;

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