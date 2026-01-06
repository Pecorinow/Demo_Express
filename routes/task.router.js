const taskRouter = require('express').Router();

// en get sur localhost:3000/api/tasks/
taskRouter.get('/', (req, res) => {
    res.send("Voici toutes les tâches", 200)
})

// en get sur localhost:3000/api/tasks/XX
// :id = segment dynamique, peut changer selon l'id recherché.
taskRouter.get('/:id', (req, res) => {
    const id = req.params.id; // = on crée une variable id, qui contient l'id du paramètre correspondant au numéro de la tâche.
    res.send(`Voici la tâche numéro ${id}`, 200)
}) 
// = Quand on va chercher la tâche numéro x, envoyer le message suivant "Voici la tâche numéro x..."

taskRouter.post('/', (req, res) => {
    res.send("Tâche ajoutée avec succès", 200)
})

module.exports = taskRouter;