const {Request, Response} = require('express');

const fakeCategoryService = require('../services/fake/fakeCategory.service')

// Création de notre taskController
const categoryController = {
    //On va créer autant de fonctions qu'il y a de fonctionnalités pour la tâche (getAll, tegById, insert, delete...), en leur donnant pour bien faire le même nom que ce qu'on a créé sur Insomnia :
        /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    getAll : (req, res) => {
        const tasks = fakeCategoryService.find();

        const dataToSend = {
            count : categoryController.length,
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
        }
        res.status(200).json(category);
    },


        /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    insert : (req, res) => {
        const categoryToAdd = req.body;

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