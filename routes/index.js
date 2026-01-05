const taskRouter = require('./task.router');

// ! 1) Créer un objet "routeur" (router) 
const router = require('express').Router(); // = j'utilise express pour créer un router.

//! 2) Configurer les routes :
// TODO les fonctions (req, res) => {} dégageront plus tard pour laler dans les controllers, les fichiers de routes ne doivent contenir que les méthodes es contollers à exécuter quand on rencontre telle ou telle route. Donc pour l'instant on met req et res, mais plus tard on les retirera.
router.get('/', (req, res) => {
    res.send("Bienvenue sur notre API de gestion de tâches, askip c'est ça qu'on fait", 200)
});

router.use('/tasks', taskRouter) // Si l'url commence par tasks, alors on dispatche sur le taskRouter.


//! 3) Rendre l'objet router exportable :
module.exports = router;