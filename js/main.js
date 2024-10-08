import { recipes } from "../datas/recipes.js";
import { RecipeCard } from "./templates/recipeCard.js";

// Sandbox of Results
let recipesList = [...recipes];
let resultsMatching = [];
let resultTags = {};

const currentPage = 'home';
if (document.body.classList.contains(currentPage)) {

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

            resultsMatching = recipesList.filter((recipe)=> {

                const nameMatch = recipe.name.toLowerCase().includes(searchValue);
                const descriptionMatch = recipe.description.toLowerCase().includes(searchValue);

                const ingredientsArray = recipe.ingredients.map((ingredient)=> ingredient.ingredient.toLowerCase())
               
                const ingredientMatch = ingredientsArray.some((ingredient)=> {

                    return ingredient.includes(searchValue);

                });

                return nameMatch || descriptionMatch || ingredientMatch;

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

        console.log('Results By search bar =>', resultsMatching.length > 0 ? resultsMatching : 'no results');	

    });

    //Check existence of datas out the scope
    if(window.localStorage.getItem('results-matching') === null){

        console.warn('No datas searched available');
    }

    

// FINAL	
}



//FUNCTIONS
async function init(path) {

    if (path) {

        recipesList = await getDatas();

    } 
    
    //Display Datas
    displayRecipes(recipesList);

    // //Get Filters Initials Data
    let appliances = getAppliancesData(recipesList);
    let ustensils = getUstensilsData(recipesList);
    let ingredients = getIngredientsData(recipesList);
    let timings = getTimingData(recipesList);

    
	 displayAvailableFilter(recipesList,ingredients,'#ingredients');
	 displayAvailableFilter(recipesList,appliances,'#appliances');
	 displayAvailableFilter(recipesList,ustensils,'#ustensils');
     displayAvailableFilter(recipesList,timings,'#timing');

     updateNowIngredients(recipesList);
     updateNowUstensils(recipesList);
     updateNowAppliances(recipesList);
     updateNowTimings(recipesList);

}


function displayRecipes(arrayRecipes){


    document.querySelector('.recipes-container').innerHTML = '';

    arrayRecipes.forEach((recipe,index) =>{
                
                const cardRecipe = new RecipeCard(recipe.name,recipe.description,recipe.time,recipe.image,recipe.ingredients,recipe.id,index);

                cardRecipe.createCard(recipe);
            
            // console.log(recipe);

    });

    counterRecipes(arrayRecipes);
}

function counterRecipes(datas) {

    //Initial Count of Recipes
    document.querySelector('.initial-count').textContent = recipesList.length;

    //Dynamique Count of Recipes
    document.querySelector(`.count`).textContent = datas ? datas.length : 'aucunes';

}

function createTag(element,parentElement){

    let tag = document.createElement('span');
    tag.classList.add('recipe-tag');
    tag.setAttribute('data-parent',parentElement);

    tag.innerHTML = `
    ${typeof element === 'number' ? element + 'mins' : element}
    <i class="fa-solid fa-xmark"></i>
    `

    document.querySelector('.recipe-taglist').appendChild(tag);


    tag.addEventListener('click', (e) => {
        
        if (e.target.classList.contains('fa-solid')) {

            //Remove datas from Tag Object
            removeTag(element,parentElement);

            //Remove Tag Component of the DOM
            e.target.parentElement.remove();

            displayRecipesFiltered();
            
        }                          

     });

}

function saveTag(element,parentFilter){

        const filtersName = getAllFilter();

        let filterExist = filtersName.find((filterName) => {

            return filterName === parentFilter;
             
        });

        if (filterExist) {

            resultTags[`${parentFilter}`] ??= [];

            resultTags[`${parentFilter}`].push(element);

        }

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

    // console.log(resultTags);
}

function removeTag(element,parentFilter) {

    if (resultTags[parentFilter].indexOf(element) !== -1) {
            
            let indexTag = resultTags[parentFilter].indexOf(element);

            resultTags[parentFilter].splice(indexTag,1);


            if(resultTags[parentFilter].length === 0) {

                delete resultTags[parentFilter];
                
            }
        }

    console.log('// Tags Clicked Available', resultTags);
}

function updateResults(arrayDatas){

    window.localStorage.setItem('results-matching',JSON.stringify(arrayDatas));
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
    let appliances = Array.from(new Set(allAppliances)).sort((a,b) => {
        return a.localeCompare(b);
    });

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


    let ustensils = Array.from(new Set(ustenList)).sort((a,b) => {
        return a.localeCompare(b);
    });

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

    let ingredients = Array.from(new Set(ingredList)).sort((a,b) => {
        return a.localeCompare(b);
    });

	return ingredients;
}


function getTimingData(arrayData) {
    
    let allTiming = arrayData.map((recipe)=> {

            return recipe.time;

    });

    let timings = Array.from(new Set(allTiming)).sort((a,b) => {
        return a - b;
    });

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

       //Trigger Event For new Recips results
        option.addEventListener('click',() =>{

            saveTag(item,parentItem);

            createTag(item,parentItem);

            //Display filtered cross selectioned recipes
            displayRecipesFiltered()

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

function displayRecipesFiltered() {

    let arrayDatas;

    if (resultsMatching.length !== 0){

        arrayDatas = resultsMatching;
        console.log('2nd search Flow',arrayDatas);

    } else {

        arrayDatas = recipesList;
        console.log('1st search Flow',arrayDatas);

    }

    let filteredRecipes = arrayDatas.filter((recipe) =>{

        // #1 Ingredients
        let matchedIngredients = true;

        if(!resultTags['ingredients']){

            matchedIngredients = true;

        } else {

            const ingredientsArray = recipe.ingredients.map((ingredient)=> ingredient.ingredient.toLowerCase())

            
            matchedIngredients = resultTags['ingredients'].every((element) => ingredientsArray.includes(element));

        }

        // #2 Ustensils
        let matchedUstensils = true;

        if(!resultTags['ustensils']){

            matchedUstensils = true;

        } else {

            matchedUstensils = resultTags['ustensils'].every((element) => recipe.ustensils.includes(element));
    
        }

        // #3 Appliances
        let matchedAppliances = true;

        if(!resultTags['appliances']){

            matchedAppliances = true;

        } else {

        
        matchedAppliances = resultTags['appliances'].every((element) => {

            let applianceArray = [recipe.appliance.toLowerCase()];

        return applianceArray.includes(element)

        });

        }

        //#4 Timing
        let matchedTiming = true;
        if(!resultTags['timing']){

            matchedTiming = true;

        } else {

        matchedTiming = resultTags['timing'].some((element) => {
    
            let timingArray = [recipe.time];
    
        return timingArray.includes(element);
    
        });

        }

        return  matchedIngredients && matchedUstensils && matchedAppliances && matchedTiming;

    });

    console.log('filtered 2nd time', filteredRecipes)

    displayRecipes(filteredRecipes)

};

async function getDatas(){

        try{

            const response = await fetch('./datas/recipes.json');
            const datas = await response.json();
    
            return datas.recipes;
        
        } catch {
        
                const errorMessage = 'Pas de datas disponibles';
        
                let errorArea = document.createElement('div');
                errorArea.classList.add('error');
                errorArea.textContent = `${errorMessage}`;
               document.querySelector('.recipes-container').append(errorArea);
        
                //Display Log error
                throw new Error (errorMessage);
        }
        
}
