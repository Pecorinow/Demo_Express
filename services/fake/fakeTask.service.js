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
        // 2) :
        return tasks.find(task => task.id === id);
        // = const task = tasks.find(task => task.id === id);
        // return task;
        // = Parmi les tâches de la DB, on parcourt chaque tâche et on cherche la tâche (task => ) dont l'id correspond à celui entre ().    (Voir 1) dans le taskController.
        // Ce que la fonction renvoie au taskController, c'est SOIT la task dont l'id = l'id d'une autre catégorie déjà existante SOIT undefined si elle n'existe pas déjà. 
        // Retouner au 3) dans le taskController.
    },

    //* insert : fonction create() :
    create : (taskToAdd) => {
        // Normalement le calcul de l'id sera automatique en DB, mais ici on va devoir le calculer nous-même :
        // On ne peut pas prendre la taille du tableau
        // => Chercher l'idMax du tableau et faire +1 :
        // const idMax = Math.max(...tasks.map(task => task.id))
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
        let idMax;
        if(tasks.length !== 0) {
            idMax = Math.max(...tasks.map(task => task.id ));
        } else {
            idMax = 0;
        }

        taskToAdd.id = idMax + 1;
        taskToAdd.isDone = false; // car on l'a fait en non-effectué à la création.

        tasks.push(taskToAdd);

        // On renvoie la nouvelle tâche au controller :
        return taskToAdd;

    },

    findToUser : (userName) => {
        return tasks.filter(task => task.to === userName)
    },

    findFromUser : (userName) => {
        return tasks.filter(task => task.by === userName)
    },

    updateStatus : (id, status) => { // status : on peut mettre n'importe quel mot, c'est juste un paramètre de notre fonction. C'est dans le taskController que lui sera attribué un rôle, quand on appelera la fonction (par exemple ici dans le taskContoller il s'appelle newStatus).
        // Trouver la tâche à modifier :
        const taskToUpdate = tasks.find(task => task.id === id)

        // on modifie son état :
        taskToUpdate.isDone = status;

        // on renvoie la tâche modifiée :
        return taskToUpdate;
    },

    update : (id, task) => { // Benoin de l'id de la tâche pour la trouver ET de la tâche entière, vu qu'on veut pouvoir la modifier entièrement.
        // Trouver la tâche à modifier :
        const taskToUpdate = tasks.find(task => task.id === id);

        // On fait les modif
        // Attention : on modifie très rarement l'id d'un élément.
        // Ici, on choisit de tout modifier sauf le status.
        taskToUpdate.name = task.name;
        taskToUpdate.category = task.category;
        taskToUpdate.before = task.before;
        taskToUpdate.by = task.by;
        taskToUpdate.to = task.to;

        return taskToUpdate;
    },

    delete : (id) => {
        // Option 1 :
        // Chercher  l'indice de l'élément à supprimer dans le tableau tasks :
        const index = tasks.findIndex.apply(task => task.id === id);
        // Pour une suppression, pas besoin de renvoyer l'élément à supprimer, on renvoie plutôt un booléen.
        // Avec un findIndex, si l'id n'existe pas, l'index sera -1 :
        if(index === -1) {
            return false
        }
        // Si l'index n'est pas -1, on peut faire la suppression avec un splice :
        tasks.splice(index, 1); // 1 = le nombre d'éléments à supprimer, ici un seul.
        return true;

        // Option 2 :
    }





}

module.exports = fakeTaskService;