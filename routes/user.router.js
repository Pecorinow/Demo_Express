const userRouter = require('express').Router();

userRouter.get('/', (req, res) => {
    res.send("Voici toutes les utilisateurs", 200)
})

userRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    res.send(`Voici l'utilisateur numéro ${req.params.id}`, 200)
})

userRouter.post('/', (req, res) => {
    const userToInsert = req.body;
    res.send(userToInsert, 201);
    console.log(userToInsert);
})

userRouter.put('/:id', (req, res) =>{
    const userId = req.params.id;
    const userUpdated = req.body;
    userUpdated.id = userId;

    res.send(userUpdated, 200);
})

userRouter.delete('/:id', (req, res) => {
    res.sendStatus(204);
})

module.exports = userRouter;