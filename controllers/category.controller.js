// Création de notre taskController
const categoryController = {
    //On va créer autant de fonctions qu'il y a de fonctionnalités pour la tâche (getAll, tegById, insert, delete...), en leur donnant pour bien faire le même nom que ce qu'on a créé sur Insomnia :
    getAll : (req, res) => {res.send(501)},

    getbyId : (req, res) => {res.send(501)},

    insert : (req, res) => {res.send(501)},

    update : (req, res) => {res.send(501)},

    delete : (req, res) => {res.send(501)}

}

// On le rend importable en l'exportant :
module.exports = categoryController;