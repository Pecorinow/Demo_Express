const {categories} = require('./fakeDB');

const fakeCategoryService = {
    find : () => {
        return categories;
    },

    findById : (id) => {
        return categories.find(category => category.id === id)
    },

    create : (categoryToAdd) => {
        const idMax = Math.max(...categories.map(category => category.id))

        categoryToAdd.id = idMax + 1;

        categories.push(categoryToAdd);

        return categoryToAdd;

    },

    findByName : (newCategoryName) => {
        return categories.find(category => category.name === newCategoryName)

        // Aussi possible : 
        // return categories.some(category => category.name === newCategoryName) -> some() renvoie un booléen true si la catégorie existe, un false si elle n'existe pas.
    }
}

module.exports = fakeCategoryService;