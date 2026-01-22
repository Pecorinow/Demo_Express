//* Ici on a laissé l'ancienne écriture

// Importer le categoryController :
const categoryController = require('../controllers/category.controller.js');

const categoryRouter = require('express').Router();

// import du middleware pour indiquer que le token est obligatoire :
const authenticationMiddleware = require('../middlewares/auth/authentication.middleware');
// import du middleware pour bloquer des routes à certains rôles :
const roleAuthorizationMiddleware = require('../middlewares/auth/roleAuthorization.middleware.js');



categoryRouter.get('/',categoryController.getAll)
// categoryRouter.get('/', (req, res) => {
//     res.send("Voici toutes les catégories", 200)
// })

categoryRouter.get('/:id', categoryController.getbyId)
// categoryRouter.get('/:id', (req, res) => {
//     const id = req.params.id;
//     res.send(`Voici la catégorie numéro ${req.params.id}`, 200)
// })

categoryRouter.post('/',
    authenticationMiddleware(), 
    roleAuthorizationMiddleware(['Admin']), // Ici, insérer le tableau des rôles qui sont acceptés pour cette route-là.
    categoryController.insert)

categoryRouter.put('/:id',
    authenticationMiddleware(), 
    roleAuthorizationMiddleware(['Admin']),
    categoryController.update)

categoryRouter.delete('/:id',
    authenticationMiddleware(), 
    roleAuthorizationMiddleware(['Admin']),
    categoryController.delete)

module.exports = categoryRouter;