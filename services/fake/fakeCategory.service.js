const {categories} = require('./fakeDB');
const { findById } = require('./fakeTask.service');

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

    }
}

module.exports = fakeCategoryService;