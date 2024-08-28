import { recipes } from "../datas/recipes.js";
import { RecipeCard } from "./templates/recipeCard.js";


// Sandbox of Results
let resultsMatching = [];

const currentPage = 'home';
if (document.body.classList.contains(`${currentPage}`)) {

    // Display Starter Elements
    init();

    // Search Bar Feature
    document.querySelector('#main-search').addEventListener('input',(e) => {

		const minimalQueryLength = 3 ;
        let searchValue = e.target.value.toLowerCase();

        // SearchBar Clear => display all of datas
        if(searchValue === "") {

            init();

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

            // Update LocalStorage Datas
            updateResults(resultsMatching);

            // Display Currents Results
            displayRecipes(resultsMatching);

            //Updates and Display News Filters with Currents Results
            displayAvailableFilter(getAppliancesData(resultsMatching),"#appliances");

            displayAvailableFilter(getUstensilsData(resultsMatching),'#ustensils');

            displayAvailableFilter(getIngredientsData(resultsMatching),'#ingredients');

            updateNowIngredients(resultsMatching);
            updateNowUstensils(resultsMatching);
            updateNowAppliances(resultsMatching);

            // Display Recipes Matched By filters
            displayRecipesByFilter(resultsMatching)
	    }	

    });

   
console.log(getResults());
 


    //Check existence of datas out the scope
    if(window.localStorage.getItem('results-matching') === null){

        console.warn('No datas searched available');
    }


    //Tags Feature
    


    // Remove Tags (testing width Highest level of delegation)        
     document.querySelector('.recipe-taglist').addEventListener('click', (e) => {         
		
        if (e.target.classList.contains('fa-solid')) {
                    
                e.target.parentElement.remove();
                
                
         }                          

	 	});


// FINAL	
}




//FUNCTIONS
async function init () {

    //Display Datas
    displayRecipes(recipes);

    //Get Filters Initials Data
    let appliances = getAppliancesData(recipes);
    let ustensils = getUstensilsData(recipes);
    let ingredients = getIngredientsData(recipes);

	 displayAvailableFilter(ingredients,'#ingredients');
	 displayAvailableFilter(appliances,'#appliances');
	 displayAvailableFilter(ustensils,'#ustensils');

     updateNowIngredients(recipes);
     updateNowUstensils(recipes);
     updateNowAppliances(recipes);

     displayRecipesByFilter(recipes);

}


function displayRecipes(arrayElement){

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

function updateResults(arrayDatas){

    window.localStorage.setItem('results-matching',JSON.stringify(arrayDatas));

}

function getResults() {

    if (window.localStorage.getItem('results-matching') !== null) {

        let arrayDatas

        return arrayDatas = JSON.parse(window.localStorage.getItem('results-matching'));
    }
}

function updateNowIngredients(arrayDatas) {

    let inputSearch = document.querySelector('#ingredients');

    inputSearch.addEventListener('input', (e) => {

        const currentString = e.target.value.toLowerCase();

        let namesIngredients = getIngredientsData(arrayDatas);

        let filteredIngredients = namesIngredients.filter((ingred) =>{

            return ingred.includes(currentString);
        })

        displayAvailableFilter(filteredIngredients,'#ingredients');

    });
    
}

function updateNowUstensils(arrayDatas) {

    let inputSearch = document.querySelector('#ustensils');

    inputSearch.addEventListener('input', (e) => {

        const currentString = e.target.value.toLowerCase();

        let namesUstensils = getUstensilsData(arrayDatas);

        let filteredUstensils = namesUstensils.filter((ustensil) =>{

            return ustensil.includes(currentString);
        })

        displayAvailableFilter(filteredUstensils,'#ustensils');

    });
    
}

function updateNowAppliances (arrayDatas) {

    let inputSearch = document.querySelector('#appliances');

    inputSearch.addEventListener('input', (e) => {

        const currentString = e.target.value.toLowerCase();

        let namesAppliances = getAppliancesData(arrayDatas);

        let filteredAppliances = namesAppliances.filter((appliance) =>{

            return appliance.includes(currentString);
        })

        displayAvailableFilter(filteredAppliances,'#appliances');

    });

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

        // console.log('** list ustensiles',ustensils);

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

	let selectedFilter = document.querySelector(`${filterTarget} + .search-results`);

    selectedFilter.innerHTML = '';


	arrayItems.forEach((item) => {

		let option = document.createElement('li');
		option.classList.add('option');
		option.setAttribute('value',item);
		option.textContent = item ;
		selectedFilter.append(option);

	});

}

function displayRecipesByFilter(arrayRecipes) {

    let filtersElement = document.querySelectorAll('.search-results');

    for (let filter of filtersElement){

        filter.addEventListener('click', (e) => {

            let selectedIngred = e.target.textContent;
				
            let parentIngred = filter.previousElementSibling.getAttribute('id');

            createTag(selectedIngred,parentIngred);

            console.log('**Input recettes (filtrees ?) 1',arrayRecipes,selectedIngred);

            let moreFiltered;

            if (parentIngred === 'ingredients') {

                moreFiltered = arrayRecipes.filter((recipe) =>{

                    let ingredientsArray = recipe.ingredients.map((ingredient)=> {

                        return ingredient.ingredient.toLowerCase();
                
                    });
    
                    let ingredientMatch = ingredientsArray.some((ingredient)=> {
                        
                        return ingredient.includes(selectedIngred);
                    });
                   
                    return ingredientMatch;
        
                });
                
            } else if (parentIngred === 'ustensils'){


                moreFiltered = arrayRecipes.filter((recipe) => {

                  let ustensilsArray = recipe.ustensils.some((ustensils) => {

                    return ustensils.includes(selectedIngred);

                  });  

                  return ustensilsArray;

            });

            } else if (parentIngred === 'appliances') {
            
                moreFiltered = arrayRecipes.filter((recipe) => {

                    // console.log(recipe);

                    return recipe.appliance.toLowerCase().includes(selectedIngred);

                })

            
            } else {

                    console.warn('no Recipes matching');
                }

                displayRecipes(moreFiltered);
                console.log('%%% Output Recettes (filtrees) 2',moreFiltered);
                
            });
    }

}