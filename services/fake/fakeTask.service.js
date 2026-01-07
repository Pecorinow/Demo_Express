// Service = un objet avec pleins de fonctions à l'intérieur, // controller.

// Contrairement aux autres fichiers où on importait les objets sans les {}, ce qu'on avait dans module.exports de la fakeDB, c'était un objet {} avec tasks dedans => tasks doit rester un élément dans un objet, donc rester entre {} :
const { tasks } = require('./fakeDB')

const fakeTaskService = {
    //* getAll : Créons une fonction find() qui va nous permettre de récupérer toutes les tâches de notre "DB" :
    find : () => {
        // Renvoyer le tableau qu'on a créé en fakeDB :
        return tasks;
    },

    //* getById : Créons une fonction findById() pour récupérer une tâche en particulier selon son id :
    findById : (id) => {
        return tasks.find(task => task.id === id) // = Parmi les tâches, on cherche la tâche dont l'id correspond à celui entre ().
    },

    //* insert : fonction create() :
    create : (taskToAdd) => {
        // Normalement le calcul de l'id sera automatique en DB, mais ici on va devoir le calculer nous-même :
        // On ne peut pas prendre la taille du tableau
        // => Chercher l'idMax du tableau et faire +1 :
        const idMax = Math.max(...tasks.map(task => task.id))
            // = trouver la valeur d'id max parmi les id des tâches contenus dans le tableau tasks.

            // tasks.map(task => task.id) -> transforme notre tableau d'objet en tableau d'id.
            //Math.max(2,36,5,120) -> trouve la valeur max
            // Problème : Notre Math.max ici au dessus nous donne un tableau de nombre, or Math max n'est pas cap de trouver le max dans un tableau
            // DONC faire
            //      Math.max(tasks.map(task => task.id))
            // donne en réalité
            //      Math.max([1,2]) => Fail
            // On doit donc décomposer le tableau avec les ... :
            //      Math.max(...tasks.map(task => id))
        taskToAdd.id = idMax + 1;

        tasks.push(taskToAdd);

        // On renvoie la nouvelle tâche au controller :
        return taskToAdd;

    }
}

module.exports = fakeTaskService;