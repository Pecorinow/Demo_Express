//* On arrive ici depuis le fichier index.js.

// Importer le task.controller :
const taskController = require('../controllers/task.controller');

const idValidatorMiddleware = require('../middlewares/idValidator.middleware');


const taskRouter = require('express').Router();
    // = j'utilise express pour créer un routeur spécial pour les tâches, appelé taskRouter.

// Autre manière d'écrire les routes :
taskRouter.route('/')
    .get(taskController.getAll)
    
    .post(taskController.insert)
    
taskRouter.route('/:id') // On met un idValidtaorMiddleware sur tout ece qui nécessite un id :
    .get(idValidatorMiddleware(), taskController.getbyId)
    
    .put(idValidatorMiddleware(), taskController.update)
    
    .delete(idValidatorMiddleware(), taskController.delete)
    
    .patch(idValidatorMiddleware(), taskController.updatedStatus)

taskRouter.get('/user/:name', taskController.getByUser)

//* Rendre le routeur exportable dans d'auters fichiers :
module.exports = taskRouter;
    // = Permet de rendre exportable l'objet taskRouter => pourra être utilisé dans le fichier index.js !
    // C'est ce qui fait que dès qu'on commence à écrire "tas..." dans index.js, il nous est direct proposé.