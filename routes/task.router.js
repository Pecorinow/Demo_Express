//* On arrive ici depuis le fichier index.js.

// Importer le task.controller :
const taskController = require('../controllers/task.controller');


const taskRouter = require('express').Router();
    // = j'utilise express pour créer un routeur spécial pour les tâches, appelé taskRouter.

// Autre manière d'écrire les routes :
taskRouter.route('/')
    .get(taskController.getAll)
    
    .post(taskController.insert)
    
taskRouter.route('/:id')
    .get(taskController.getbyId)
    
    .put(taskController.update)
    
    .delete(taskController.delete)
    
    .patch(taskController.updatedStatus)

taskRouter.get('/user/:name', taskController.getbyUser)

//* Rendre le routeur exportable dans d'auters fichiers :
module.exports = taskRouter;
    // = Permet de rendre exportable l'objet taskRouter => pourra être utilisé dans le fichier index.js !
    // C'est ce qui fait que dès qu'on commence à écrire "tas..." dans index.js, il nous est direct proposé.