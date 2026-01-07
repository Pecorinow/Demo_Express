// const userRouter = require('express').Router();

// // Import du taskRouter pour l'utiliser dans le userRouter :
// const taskRouter = require('./task.router'); 

// userRouter.get('/', (req, res) => {
//     res.send("Voici toutes les utilisateurs", 200)
// })

// userRouter.get('/:id', (req, res) => {
//     const userId = req.params.id;
//     res.send(`Voici l'utilisateur numéro ${userId}`, 200)
// })

// userRouter.get('/:id?tasks', (req, res) => {
//     const taskId = req.params.id.query.id;
//     res.send(taskId, 200)

// })

// // Tâche à créer :
// // {
// //  "id" : "2",
// //  "name": "Jouer de la flûte 🪈",
// // 	"category": "Hobby",
// // 	"by": "Caroline",
// // 	"for": "Caroline",
// //  "isDone" : false
// // }

// // User à créer :
// // {




// userRouter.post('/', (req, res) => {
//     const userToInsert = req.body;
//     res.send(userToInsert, 201);
//     console.log(userToInsert);
// })

// userRouter.put('/:id', (req, res) =>{
//     const userId = req.params.id;
//     const userUpdated = req.body;
//     userUpdated.id = userId;

//     res.send(userUpdated, 200);
// })

// userRouter.delete('/:id', (req, res) => {
//     res.sendStatus(204);
// })

// module.exports = userRouter;