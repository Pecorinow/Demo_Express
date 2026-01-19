```js
// ! Version de quand on utilisait le fakeTaskService

//* On arrive ici depuis le fichier index.js.

// Importer le task.controller :
const taskController = require('../controllers/task.controller');

const idValidatorMiddleware = require('../middlewares/idValidator.middleware');

const nameValidatorMiddleware = require('../middlewares/nameValidator.middleware');


const taskRouter = require('express').Router();
    // = j'utilise express pour créer un routeur spécial pour les tâches, appelé taskRouter.

// Autre manière d'écrire les routes :
taskRouter.route('/')
    .get(taskController.getAll)
    .post(nameValidatorMiddleware(), taskController.insert)
        // middleware créé dans nameValidator.middleware.js !
    
taskRouter.route('/:id') // On met un idValidtaorMiddleware sur tout ce qui nécessite un id :
    .get(idValidatorMiddleware(), taskController.getbyId)
    .put(idValidatorMiddleware(), nameValidatorMiddleware(), taskController.update) //
    .delete(idValidatorMiddleware(), taskController.delete)
    .patch(idValidatorMiddleware(),nameValidatorMiddleware(), taskController.updatedStatus)

taskRouter.get('/user/:name', taskController.getByUser)

//* Rendre le routeur exportable dans d'auters fichiers :
module.exports = taskRouter;
    // = Permet de rendre exportable l'objet taskRouter => pourra être utilisé dans le fichier index.js !
    // C'est ce qui fait que dès qu'on commence à écrire "tas..." dans index.js, il nous est direct proposé.