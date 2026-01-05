const taskRouter = require('express').Router();

taskRouter.get('/', (req, res) => {
    res.send("Voici toutes les tâches", 200)
})

// 
taskRouter.get('/:id', (req, res) => { // :id = segment dynamique, peut changer selon l'id recherché.
    const id = req.params.id;
    res.send(`Voici la tâche numéro ${id}`, 200)
})

taskRouter.post('/', (req, res) => {
    res.send("Tâche ajoutée avec succès", 200)
})

module.exports = taskRouter;