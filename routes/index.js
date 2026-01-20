//* On est envoyé ici depuis le point 2) du fichier app.js.
// Ici c'est un peu le bras droit de app.js qui va dispatcher les routes selon comment se termine l'url de notre site :

// Imports des objets trucRouter depuis les fichiers truc.router.js :
// Imports : souvent écrits EN HAUT de la page :
const taskRouter = require('./task.router'); 
const categoryRouter = require('./category.router');
const authRouter = require('./auth.router');

// ! 1) Créer un objet "routeur" (router) 
const router = require('express').Router();
    // = j'utilise express pour créer un router.

//! 2) Configurer les routes :
// TODO les fonctions (req, res) => {} dégageront plus tard pour aller dans les controllers, les fichiers de routes ne doivent contenir que les méthodes des contollers à exécuter quand on rencontre telle ou telle route. Donc pour l'instant on met req et res, mais plus tard on les retirera.
router.get('/', (req, res) => { 
    res.send("Bienvenue sur notre API de gestion de tâches, askip c'est ça qu'on fait", 200)
});
    //* On arrive ici après l'adresse /api du fichier app.js.
    // Donc ce que ce '/' dit ici c'est : "S'il n'y a rien après /api dans l'adresse http://localhost:3000/api/", alors lancer le message suivant".

//*... Mais si /api est suivi de /tasks ou /category, alors :
router.use('/tasks', taskRouter);
    // = Si l'url se termine par tasks, alors on dispatche sur le taskRouter. (-> Voir la suite sur task.router.js)

router.use('/categories', categoryRouter);
    // = Si l'url se termine par categories, alors on dispatche sur le categoryRouter. (-> Voir la suite sur category.router.js)

router.use('/auth', authRouter);

//! 3) Rendre l'objet router exportable :
module.exports = router;