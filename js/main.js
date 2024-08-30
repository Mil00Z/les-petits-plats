import { recipes } from "../datas/recipes.js";
import { RecipeCard } from "./templates/recipeCard.js";

// let helloRecipes=[];

// const newRecipes = fetch('datas/recipes.json');
// newRecipes.then((response) => response.json())
// .then((data) => {
//    let helloRecipes = data.recipes;
//    displayRecipes(helloRecipes);

//    helloRecipes.forEach((recipe) => {

//     console.log(recipe)

//        helloRecipes.push(recipe);
//    })

// });


// Sandbox of Results
let resultsMatching = [];
let resultTags = {};

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
            displayAvailableFilter(resultsMatching,getAppliancesData(resultsMatching),"#appliances");

            displayAvailableFilter(resultsMatching,getUstensilsData(resultsMatching),'#ustensils');

            displayAvailableFilter(resultsMatching,getIngredientsData(resultsMatching),'#ingredients');

            updateNowIngredients(resultsMatching);
            updateNowUstensils(resultsMatching);
            updateNowAppliances(resultsMatching);

	    }	

    });

    //Check existence of datas out the scope
    if(window.localStorage.getItem('results-matching') === null){

        console.warn('No datas searched available');
    }


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
    let timings = getTimingData(recipes);

    
	 displayAvailableFilter(recipes,ingredients,'#ingredients');
	 displayAvailableFilter(recipes,appliances,'#appliances');
	 displayAvailableFilter(recipes,ustensils,'#ustensils');
     displayAvailableFilter(recipes,timings,'#timing');

     updateNowIngredients(recipes);
     updateNowUstensils(recipes);
     updateNowAppliances(recipes);
     updateNowTimings(recipes);

}


function displayRecipes(arrayRecipes){


    document.querySelector('.recipes-container').innerHTML = '';

    arrayRecipes.forEach((recipe,index) =>{
                
                const cardRecipe = new RecipeCard(recipe.name,recipe.description,recipe.time,recipe.image,recipe.ingredients,recipe.id,index);

                cardRecipe.createCard(recipe);
            
            // console.log(recipe);

    });

    updateCounterRecipes(arrayRecipes);
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


    tag.addEventListener('click', (e) => {
        
        if (e.target.classList.contains('fa-solid')) {

            removeTag(element,parentElement);
                    
            e.target.parentElement.remove();

        }                          

     });

}

function saveTag(element,parentFilter){

        const filtersName = getAllFilter();

        filtersName.forEach((filterName) => {

        if (parentFilter === filterName) {
             
           resultTags[`${filterName}`] ??= [];

           resultTags[`${filterName}`].push(element);
 
          };

    });

    // if (parentFilter === "ingredients") {
        
    //     let ingredientsTags = [];
    //     ingredientsTags.push(element);

    //     resultTags[parentFilter] = ingredientsTags;

    // } else if (parentFilter === "ustensils") {

    //     let ustensilsTags = [];     
    //     ustensilsTags.push(element);

    //     resultTags[parentFilter] = ustensilsTags;

    // } else if(parentFilter === "appliances") {

    //     let appliancesTags = [];
    //     appliancesTags.push(element);

    //     resultTags[parentFilter] = appliancesTags;

    // }


}

function removeTag(element,parentFilter) {

    if (resultTags[parentFilter].indexOf(element) !== -1) {
            
            let indexTag = resultTags[parentFilter].indexOf(element);

            resultTags[parentFilter].splice(indexTag,1);
        }

    console.log(resultTags)
}

function updateResults(arrayDatas){

    window.localStorage.setItem('results-matching',JSON.stringify(arrayDatas));

    // console.log(getResults())

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

        displayAvailableFilter(arrayDatas,filteredIngredients,'#ingredients');

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

        displayAvailableFilter(arrayDatas,filteredUstensils,'#ustensils');

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

        displayAvailableFilter(arrayDatas,filteredAppliances,'#appliances');

    });

}

function updateNowTimings(arrayDatas){

    let inputSearch = document.querySelector('#timing');

    inputSearch.addEventListener('input', (e) => {

        const currentString = e.target.value.toLowerCase();

        let valuesTiming = getTimingData(arrayDatas);

    
        let filteredTiming = valuesTiming.filter((time) =>{
           
            return time.toString().includes(currentString);
        })

        displayAvailableFilter(arrayDatas,filteredTiming,'#timing');

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


function getTimingData(arrayData) {
    
    let allTiming = arrayData.map((recipe)=> {

            return recipe.time;

    });

    let timings = Array.from(new Set(allTiming));

    return timings;
}



function displayAvailableFilter(arrayDatas,arrayItems,filterTarget){

	let selectedFilter = document.querySelector(`${filterTarget} + .search-results`);

    selectedFilter.innerHTML = '';

	arrayItems.forEach((item) => {

        let parentItem = selectedFilter.previousElementSibling.getAttribute('id');

		let option = document.createElement('li');
		option.classList.add('option');
		option.setAttribute('value',item);

        if (typeof item === 'number'){
            option.textContent = `${item} mins` ;
        } else {
            option.textContent = item ;
        }

       
	
        option.addEventListener('click',() =>{

            saveTag(item,parentItem);

            createTag(item,parentItem);

            displayRecipesByFilter(arrayDatas, parentItem, item);

        });

		selectedFilter.append(option);

	});

}

function getAllFilter() {

        let targetFilters = document.querySelectorAll(".search-filter");

        let filters=[];

        targetFilters.forEach((filter) => {

            filters.push(filter.getAttribute('id'));

        });

        return filters;
}

function displayRecipesByFilter(arrayRecipes,parentItem,selectedItem) {

    let moreFiltered;

    console.log('**Input recettes (filtrees ?) 1',arrayRecipes,selectedItem);

        if (parentItem === 'ingredients') {

                moreFiltered = arrayRecipes.filter((recipe) =>{

                    let ingredientsArray = recipe.ingredients.map((ingredient)=> {

                        return ingredient.ingredient.toLowerCase();
                
                    });
    
                    let ingredientMatch = ingredientsArray.some((ingredient)=> {
                        
                        return ingredient.includes(selectedItem);
                    });
                   
                    return ingredientMatch;
        
                });
                
        } else if (parentItem === 'ustensils'){

                moreFiltered = arrayRecipes.filter((recipe) => {

                  let ustensilsArray = recipe.ustensils.some((ustensils) => {

                    return ustensils.includes(selectedItem);

                  });  

                  return ustensilsArray;

            });

        } else if (parentItem === 'appliances') {
            
                moreFiltered = arrayRecipes.filter((recipe) => {

                    return recipe.appliance.toLowerCase().includes(selectedItem);

                })

        }  else if (parentItem === 'timing') {
            
            moreFiltered = arrayRecipes.filter((recipe) => {

                return recipe.time.toString().toLowerCase().includes(selectedItem);

            })

    } else {
            console.warn('no Recipes matching');
        }

    displayRecipes(moreFiltered);

    console.log('%%% Output Recettes (filtrees) 2',moreFiltered);
                
}