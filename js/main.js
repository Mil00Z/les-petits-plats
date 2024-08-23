import { recipes } from "../datas/recipes.js";
import { RecipeCard } from "./templates/recipeCard.js";


// Sandbox of Results
let resultsMatching = [];

const currentPage = 'home';
if (document.body.classList.contains(`${currentPage}`)) {

    // Display Starter Elements
    init();

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

            resultsMatching = recipes.filter((recipe)=> {

                const nameMatch = recipe.name.toLowerCase().includes(searchValue);
                const descriptionMatch = recipe.description.toLowerCase().includes(searchValue);

                const ingredientsArray = recipe.ingredients.map((ingredient)=> ingredient.ingredient.toLowerCase())
               
                const ingredientMatch = ingredientsArray.some((ingredient)=> {

                    return ingredient.includes(searchValue);

                });

                return nameMatch || descriptionMatch || ingredientMatch

            });

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
async function init () {

    //Display Datas
    displayRecipe(recipes);

    //Get Filters Initials Data
    let appliances = getAppliancesData(recipes);

    let ustensils = getUstensilsData(recipes);

    let ingredients = getIngredientsData(recipes);

	 displayAvailableFilter(ingredients,'#ingredients');
	 displayAvailableFilter(ustensils,'#ustensils');
	 displayAvailableFilter(appliances,'#appliances');


}


function displayRecipe(arrayElement){

    document.querySelector('.recipes-container').innerHTML = '';

    arrayElement.forEach((recipe,index) =>{
                
                const cardRecipe = new RecipeCard(recipe.name,recipe.description,recipe.time,recipe.image,recipe.ingredients,recipe.id,index);
    
                cardRecipe.createCard(recipe);

                // console.log(recipe);

    });

    updateCounterRecipes(arrayElement);
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

function getUpdateResults(){

    return resultsMatching;
}


function getAppliancesData(arrayData){

    let allAppliances = arrayData.map((recipe) =>{
        return recipe.appliance.toLowerCase();
    });

    // /Get distinct item of a collection of values
    let appliances = Array.from(new Set(allAppliances));

      //   console.log('^^ list appareils', appliances);

		  return appliances;
    
}

function getUstensilsData(arrayData){  

    let ustenList = [];

    let ustensilsArrays = arrayData.map((recipe) => {

        return recipe.ustensils;

    });

    ustensilsArrays.forEach((singleUstensilArray) => {


		  let singleUstensil = singleUstensilArray.map((element) =>{
			  return element.toLowerCase();
		  });

        ustenList = ustenList.concat(singleUstensil);

    });


    let ustensils = Array.from(new Set(ustenList));

        console.log('** list ustensiles',ustensils);

		return ustensils;

 }


function getIngredientsData(arrayData){

    let ingredList = [];

    let ingredientsArrays = arrayData.map((recipe) => {

        return recipe.ingredients
   });

   
    ingredientsArrays.forEach((singleIngredientArray) => {

        let singleIngred = singleIngredientArray.map((element) =>{

            return element.ingredient.toLowerCase();
        })

        ingredList = ingredList.concat(singleIngred)

});

    let ingredients = Array.from(new Set(ingredList));

   //  console.log('__ list ingredients',ingredients);

		return ingredients;
}


function displayAvailableFilter(arrayItems,filterTarget){

	const selectedFilter = document.querySelector(`${filterTarget}`);

	arrayItems.forEach((item) => {

		let option = document.createElement('option');
		option.setAttribute('value',item);
		option.textContent = item ;

		selectedFilter.append(option);

	});

}

