## Ancienne version du taskRouter
### avec les explications

```js
//* On arrive ici depuis le fichier index.js.

// Importer le task.controller :
const taskController = require('../controllers/task.controller');


const taskRouter = require('express').Router();
    // = j'utilise express pour créer un routeur spécial pour les tâches, appelé taskRouter.

taskRouter.route('/')
    
    .get((req, res) => {
        res.send( {message : "Voici toutes les tâches"}, 200)
    })
    
    .post((req, res) => {
        const taskToInsert = req.body;
            // = On crée une variable pour le corps de la tâche à envoyer dans la request.
        res.send(taskToInsert, 201)
            // 201 = la ressource a été créée avec succès.
    })

taskRouter.route('/:id')
    
    .get((req, res) => {
        const id = req.params.id;
            // :id = segment dynamique, peut changer selon l'id recherché.
            // = On crée une variable id, qui contient l'id du paramètre correspondant au numéro de la tâche.
        res.send(`Voici la tâche numéro ${id}`, 200)
    })
    
    .put((req, res) => {
        const taskId = req.params.id;
        const taskUpdated = req.body; 
            // = La tâche modifiée se trouve dans le body de ma request.
        taskUpdated.id = taskId;
            // = Modification : L'id de la tâche est le même que celui de la tâche updated => la tâche updated remplace l'ancienne tâche !
        res.send(taskUpdated, 200); 
            // Ici, 200 car je sais plus
    })
    
    .delete((req, res) => {
        res.sendStatus(204);
            // 204 - No content : Succès mais rien de particulier à renvoyer.
            //* res.senStatus : car cette fois-ci, on veut juste renvoyer le statusCode d'échec ou de réussite.
            // res.send = utilisé quand on veut renvoyer une donnée + un statusCode
    })
    

taskRouter.get('/user/:name', taskController.getbyUser)



// en get sur localhost:3000/api/tasks/ :
taskRouter.get('/', (req, res) => {
    res.send("Voici toutes les tâches", 200)
})

// en get sur localhost:3000/api/tasks/XX :
taskRouter.get('/:id', (req, res) => {
    const id = req.params.id;
        // :id = segment dynamique, peut changer selon l'id recherché.
        // = On crée une variable id, qui contient l'id du paramètre correspondant au numéro de la tâche.
    res.send(`Voici la tâche numéro ${id}`, 200)
}) 
    // = Quand on va chercher la tâche numéro x, envoyer le message suivant "Voici la tâche numéro x..."
    // Le :id fonctionne aussi avec :name, :truc, :machin, n'importe quel paramètre.


//* Ajout d'une tâche : POST :
taskRouter.post('/', (req, res) => {
    const taskToInsert = req.body;
        // = On crée une variable pour le corps de la tâche à envoyer dans la request.
    res.send(taskToInsert, 201)
        // 201 = la ressource a été créée avec succès.
    console.log(taskRouter);
    // Avant, on avait écrit jute ça :
    // res.send("Tâche ajoutée avec succès", 200)
})

//* Modification : PUT :
taskRouter.put('/:id', (req, res)=> { // Pour modifier la tâche avec l'id x...
    const taskId = req.params.id;
    const taskUpdated = req.body; 
        // = La tâche modifiée se trouve dans le body de ma request.
    taskUpdated.id = taskId;
        // = Modification : L'id de la tâche est le même que celui de la tâche updated => la tâche updated remplace l'ancienne tâche !
    res.send(taskUpdated, 200); 
        // Ici, 200 car je sais plus
})

//* Suppression : DELETE :
taskRouter.delete('/:id', (req, res) => {
    res.sendStatus(204);
        // 204 - No content : Succès mais rien de particulier à renvoyer.
        //* res.senStatus : car cette fois-ci, on veut juste renvoyer le statusCode d'échec ou de réussite.
        // res.send = utilisé quand on veut renvoyer une donnée + un statusCode
})

//* Attention : on ne peut pas avoir deux fois le même verbe sur la même url !
// Donc pas deux fois GET sur '/' ou sur '/tasks', car le routeur ne sait pas vers lequel dispatcher les routes et envoie par défaut vers le premier GET sans jamais passer par le deuxième.

//! Bonus 1 :
// 1) Créer un GetByUser dans le dossier Tasks sur Insomnia, avec l'url http://localhost:3000/api/tasks/user/Caroline, ou http://localhost:3000/api/tasks/user/1 .
//* Même si on n'a pas créé de taskRouter ni de body pour reprendre les utilisateurs, ça marche, car il suffit que l'url contenant user existe !

// 2)
taskRouter.get('/user/:name', (req, res) => {
    // -> marche aussi avec :id, mais comme on avait déjà un nom dans le body de la tâche créée on a pris name.
    res.send(`Voici les tâches de ${req.params.name}`, 200)
})

//! Bonus 2 :
// 1) Créer dans Insomnia un PATCH UpdateStatus, avec l'url http://localhost:3000/api/tasks/1 . -> On demande l'id de la tâche dans l'url.
// 2) Dans ce PATCH, mettre en body uniquement le paramètre à changer, ici {isDone : true}.
// 3) Dans task.router.js, demander l'id de la tâche

taskRouter.patch('/:id', (req, res) => {
    const updatedStatus = {
        id : req.params.id,
        isDone : req.body.isDone
    }
    res.send(updatedStatus, 200)
})


//* Rendre le routeur exportable dans d'auters fichiers :
module.exports = taskRouter;
    // = Permet de rendre exportable l'objet taskRouter => pourra être utilisé dans le fichier index.js !
    // C'est ce qui fait que dès qu'on commence à écrire "tas..." dans index.js, il nous est direct proposé.
```