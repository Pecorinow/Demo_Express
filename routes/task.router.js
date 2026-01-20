//* On arrive ici depuis le fichier index.js.

// Importer le task.controller :
const taskController = require('../controllers/task.controller');

const idValidatorMiddleware = require('../middlewares/idValidator.middleware');
const nameValidatorMiddleware = require('../middlewares/nameValidator.middleware');


// Midleware pour le token :
const authenticationMiddleware =  require('../middlewares/auth/authentication.middleware');

//
const userAuthorizationMiddleware = require('../middlewares/auth/userAuthorization.middleware');

const taskRouter = require('express').Router();
    // = j'utilise express pour créer un routeur spécial pour les tâches, appelé taskRouter.

// Autre manière d'écrire les routes :
taskRouter.route('/')
    .get(taskController.getAll)
    .post(authenticationMiddleware(), taskController.insert)
        // On met le authenticationMiddleware en prmeier, car il faut être connecté avant d'effectuer la moindre tâche.
        
    
taskRouter.route('/:id')
    .get(taskController.getbyId)
    .put(taskController.update) //
    .delete(taskController.delete)
    .patch(taskController.updatedStatus)

taskRouter.get('/user/:id', authenticationMiddleware(), userAuthorizationMiddleware(), taskController.getByUser)

//* Rendre le routeur exportable dans d'auters fichiers :
module.exports = taskRouter;
    // = Permet de rendre exportable l'objet taskRouter => pourra être utilisé dans le fichier index.js !
    // C'est ce qui fait que dès qu'on commence à écrire "tas..." dans index.js, il nous est direct proposé.