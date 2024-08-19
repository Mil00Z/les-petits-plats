export class RecipeCard {

        constructor(name,description,time,image,ingredients,id) {

            this._name = name;
            this._description = description;
            this._time = time;
            this._image = image;
            this._id = id;
            this._ingredients = ingredients;
            this._layout = document.body.classList.value ?? 'undefined';

    }


    createCard(item) {

        let article = document.createElement('article');
        article.classList.add('card','card-recipe');
        article.dataset.recipeId = this._id;
        article.dataset.layout = this._layout;	

        let image = document.createElement('img');
        image.src = `assets/${this._image}`;
        image.alt = `image nommée : ${this._name}`;
        image.classList.add('recipe-thumbnail');

        let content = document.createElement('div');
        content.classList.add('recipe-content');
        
        let title = document.createElement('h2');
        title.classList.add('recipe-title');
        title.textContent = this._name;

        let timing = document.createElement('span');
        timing.classList.add('recipe-timing');
        timing.textContent = `${this._time} mins`;

        let recette = document.createElement('h3');
        recette.classList.add('recipe-subtitle');
        recette.textContent = 'recette';

        let description = document.createElement('p');
        description.classList.add('recipe-description');
        description.textContent = this._description;

        let ingredient = document.createElement('h3');
        ingredient.classList.add('recipe-subtitle');
        ingredient.textContent = 'ingredient';

        let ingredientList = document.createElement('ul');
        ingredientList.classList.add('recipe-list');

        // Checking Ingredients List Array
        for (let i=0; i < this._ingredients.length; i++) {

            let theIngredient = document.createElement('li');
            theIngredient.classList.add('recipe-ingredient');
            theIngredient.textContent=`${this._ingredients[i].ingredient}`

                if (this._ingredients[i].quantity) {

                    let ingredientQuantity = document.createElement('span');
                    ingredientQuantity.classList.add('recipe-quantity');
                    ingredientQuantity.textContent = `${this._ingredients[i].quantity} ${this._ingredients[i].unit ?? ''}`;
                    
                    theIngredient.append(ingredientQuantity);
                } 

                ingredientList.append(theIngredient)
            }
      
      
        //Push Datas
        content.append(title,timing,recette,description,ingredient,ingredientList);

        article.append(image,content);

        document.querySelector('.recipes-container').append(article);

        //  console.log(item);
        return article;
    }


}