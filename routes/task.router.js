//* On arrive ici depuis le fichier index.js.
// C'est ici 

// 
const taskRouter = require('express').Router();
    // = j'utilise express pour créer un routeur spécial pour les tâches, appelé taskRouter.

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

taskRouter.get()

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

module.exports = taskRouter;
    // = Permet de rendre exportable l'objet taskRouter => pourra être utilisé dans le fichier index.js !
    // C'est ce qui fait que dès qu'on commence à écrire "tas..." dans index.js, il nous est direct proposé.