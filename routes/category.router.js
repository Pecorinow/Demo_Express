//* Ici on a laissé l'ancienne écriture

// Importer le categoryController :
const categoryController = require('../controllers/category.controller.js');

const categoryRouter = require('express').Router();

const idValidatorMiddleware = require('../middlewares/idValidator.middleware');

const nameValidatorMiddleware = require('../middlewares/nameValidator.middleware');

categoryRouter.get('/',categoryController.getAll)
// categoryRouter.get('/', (req, res) => {
//     res.send("Voici toutes les catégories", 200)
// })

categoryRouter.get('/:id', idValidatorMiddleware(), categoryController.getbyId)
// categoryRouter.get('/:id', (req, res) => {
//     const id = req.params.id;
//     res.send(`Voici la catégorie numéro ${req.params.id}`, 200)
// })

categoryRouter.post('/', nameValidatorMiddleware(), categoryController.insert)
// categoryRouter.post('/', (req, res) => {
//     const categoryToInsert = req.body;
//     res.send(categoryToInsert, 201);
//     console.log(categoryToInsert);

// })

categoryRouter.put('/:id', idValidatorMiddleware(), nameValidatorMiddleware(),categoryController.update)
// categoryRouter.put('/:id', (req, res) =>{
//     const categoryId = req.params.id;
//     const categoryUpdated = req.body;
//     categoryUpdated.id = categoryId;

//     res.send(categoryUpdated, 200);
// })

categoryRouter.delete('/:id', idValidatorMiddleware(), categoryController.delete)
// categoryRouter.delete('/:id', (req, res) => {
//     res.sendStatus(204);
// })

module.exports = categoryRouter;