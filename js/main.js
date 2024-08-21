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

       
    // Search Bar Feature
    document.querySelector('#search').addEventListener('input',(e) => {

		const minimalQueryLength = 3 ;

        let nameMatching = [];
        let descriptionMatching = [];
        let ingredientMatching = [];

        let resultsMatching = []

        if(e.target.value.length >= minimalQueryLength) {

            // console.log('***searching with this input text =>', e.target.value);

            for (let recipe in recipes){
    
            let name = recipes[recipe].name;
            let description = recipes[recipe].description;
            let ingredientList = recipes[recipe].ingredients;

                        
            // Search By Description
            if (description.includes(e.target.value)){

            resultsMatching.push(recipes[recipe]);

            document.querySelector('.recipes-container').innerHTML = '';

            displayRecipe(resultsMatching);

            // Search By Names
            } else if (name.includes(e.target.value)) {

            resultsMatching.push(recipes[recipe]);

            document.querySelector('.recipes-container').innerHTML = '';

            displayRecipe(resultsMatching);
                             
            // Search By Ingredient (in List)
            } else if (ingredientList) {

            for (let element in ingredientList) {

			    let nameIngredient = ingredientList[element].ingredient;

                if (nameIngredient.includes(e.target.value)) {

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



    //Tags Feature
    let filtersElement = document.querySelectorAll('.filters');
    
    for (let filter of filtersElement){

        filter.addEventListener('change', (e) => {

            let selectedIngred = e.target.value;
            let parentIngred = e.target.getAttribute('id');

            createTag(selectedIngred,parentIngred);

        });
    }

   
// FINAL	
}




//FUNCTIONS
function displayRecipe(arrayElement){

        arrayElement.forEach((recipe) =>{
                
                const cardRecipe = new RecipeCard(recipe.name,recipe.description,recipe.time,recipe.image,recipe.ingredients,recipe.id);
    
                cardRecipe.createCard(recipe);

        });
}

function updateCounterRecipes(datas) {

    document.querySelector(`.count`).textContent = datas.length;

}

function createTag(element,parentElement){

    // console.log(element);

    let tag = document.createElement('span');
    tag.classList.add('recipe-tag');
    tag.setAttribute('data-parent',parentElement);

    tag.innerHTML = `
    ${element}
    <i class="fa-solid fa-xmark"></i>
    `
    document.querySelector('.recipe-taglist').appendChild(tag);

}