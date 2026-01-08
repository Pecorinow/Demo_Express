const {Request, Response} = require('express');

const fakeCategoryService = require('../services/fake/fakeCategory.service')

// Création de notre categoryController
const categoryController = {
    //On va créer autant de fonctions qu'il y a de fonctionnalités pour la tâche (getAll, tegById, insert, delete...), en leur donnant pour bien faire le même nom que ce qu'on a créé sur Insomnia :
        /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    getAll : (req, res) => {
        const categories = fakeCategoryService.find();

        const dataToSend = {
            count : categories.length,
            categories
        };
        res.status(200).json(dataToSend);
    },


        /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    getbyId : (req, res) => {
        const id = +req.params.id;

        const category = fakeCategoryService.findById(id);

        if (!category) {
            res.status(404).json( { statusCode : 404, message : "Catégorie non trouvée"})
        } // sinon :
        res.status(200).json(category);
    },


        /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    insert : (req, res) => {
        const categoryToAdd = req.body;

        // Créer la variable du nom de la nouvelle catégorie :
        const newCategoryName = categoryToAdd.name;

        // Créer la variable newCategory, surlaquelle on applique la fonction de recherche par nom :
        const newCategory = fakeCategoryService.findByName(newCategoryName);
    
        // Si la catégorie existe :
        if(newCategory) {
            res.status(409).json( {statusCode : 409, message : "Conflit ⚔️  - Une catégorie portant ce nom existe déjà"})
        }
        // Sinon, la créer :
        const addedCategory = fakeCategoryService.create(categoryToAdd);

        res.location(`/api/categories/${addedCategory.id}`);

        res.status(201).json(addedCategory)
        
},

        /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    update : (req, res) => {
        res.send(501)
    },

        /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    delete : (req, res) => {
        res.send(501)
    } 

}

// On le rend importable en l'exportant :
module.exports = categoryController;