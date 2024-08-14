export class RecipeCard {

        constructor(name,description,time,image,id) {

            this._name = name;
            this._descritpion = description;
            this._time = time;
            this._image = image;
            this._id = id;
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

        let recette = document.createElement('h3');
        recette.classList.add('recipe-subtitle');
        recette.textContent = 'recette';

        let description = document.createElement('p');
        description.classList.add('recipe-description');
        description.textContent = this._descritpion;

        let ingredient = document.createElement('h3');
        ingredient.classList.add('recipe-subtitle');
        ingredient.textContent = 'ingredient';

        let list = document.createElement('div');
        list.classList.add('recipe-list');
      
        
         //Push Datas
         content.append(title,recette,description,ingredient,list)

         article.append(image,content);

         document.querySelector('.recipes-container').append(article);

        
        return article;
    }

}