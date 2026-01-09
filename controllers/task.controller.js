// Import du type Request et Response pour la JSDoc juste en dessous (sinon, pas d'auto-complétion, pourquoi, je ne sais pas) :
const {Request, Response} = require('express');

// Import du fakeTaskService : :
const fakeTaskService = require('../services/fake/fakeTask.service')

// Création de notre taskController :
const taskController = {
    //On va créer autant de fonctions qu'il y a de fonctionnalités pour la tâche (getAll, tegById, insert, delete...), en leur donnant pour bien faire le même nom que ce qu'on a créé sur Insomnia :
    //* JSDoc pour l'auto-complétion des req et res :
    //* À faire au dessus de chaque fonction (getAll, insert...) :
    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    getAll : (req, res) => {
        const tasks = fakeTaskService.find();

        //* Version 1 : quand on a peu de connées à renvoyer :
        // Renvoyer le tableau tel quel avec toutes les tâches :
        // res.status(200).json(tasks)
            // = res.send(tasks, 200)
            // = renvoie un statut 200, et va chercher le tableau des tâches en fakeDB et le renvoie en json.

        //* Version 2 : quand on a bcp de données à renvoyer :
        // Renvoyer un objet avec le nombre total des tâches + le tableau :
        const dataToSend = {
            count : tasks.length,
            tasks
                // = tasks : tasks
                // Quand on a le même nom en propriété et en valeur, on peut juste écrire le nom tout seul.
        };
        res.status(200).json(dataToSend);


    },

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    getbyId : (req, res) => {
        // Les paramètres récupérés seront toujour sous forme de chaine de caractères. Si on veut que notre id soit un nombre (pour pouvoir faire un ===), il faut faire un parse (soit avec parsInt, soit avec +) :
        const id = +req.params.id;
        // = 1) On va chercher l'id dans les paramètres de la request (pcq il ne se trouve pas ailleurs)
        // Voir 2) dans le fakeTaskService

        const task = fakeTaskService.findById(id);
        // = 3) On crée la variable task, qui correspond à la task cherchée par la fonction finsById => task = la valeur renvoyée par le return du taskService !

        // 4) Si l'id n'existe pas = si pas de tâche correspondante...
        if(!task) {
            res.status(404).json( {
                statusCode : 404,
                message : "Tâche non trouvée"})
                // = ...alors on renvoie un status 404 et un message json.
        }

        // ...Sinon, si la tâche existe :
        res.status(200).json(task); 
 
    },

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    getByUser : (req, res) => {
        // ! finir la fonctionnalité du getByUser. Il vous faudra, dans le service, une fonction qui recherche toutes les tâches de l’utilisateur. 
        const userName = req.params.name;
        //* ATTENTION : le "name" est écrit comme ça d'après ce qu'on a écrit dans le taskRouter : '/user/:name', pas d'après le "to" de la DB !!

        //Version 1 :
        // tasksOfUser = fakeTaskService.findToUser(userName);

        // const tasksToSend = {
        //     userName : userName,
        //     tasks : tasksOfUser
        // }

        // if(tasksOfUser) {
            // res.status(200).json(tasksToSend);
        // } else {
        // res.status(404).json( {
        //     statusCode : 404,
        //     message : "Aucune tâche ne correspond à cet utilisateur."});
        // }

        //Version 2 : le pimp 🌟
        // TODO On souhaite afficher les tâches attribuées à l'utilisateur ET les tâches que lui a assignées :
        const tasksToDo = fakeTaskService.findToUser(userName);

        const tasksGiven = fakeTaskService.findFromUser(userName);

        const dataToSend = {
            tasksToDo,
            tasksGiven
        }

        res.status(200).json(dataToSend);

    },

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    insert : (req, res) => {
        //* Opérations AVANT d'être passé par fakeTaskService :
        const taskToAdd = req.body;
            // = On crée une variable taskToAdd qui correspond au body de la request.

        const addedTask = fakeTaskService.create(taskToAdd);
            // = on crée une nouvelle variable pour la tâche ajoutée, addedTask, qui va être ajoutée ajoutée à la DB via la fonction create(taskToAdd)
            // Cette fonction va remanier taskToAdd, lui donner un id, et la renvoyer à taskController pour créer addedTask.
        
        //* Opérations APRÈS être passé par fakeTaskService
        // Pour respecter les principes REST, on doit ajouter à la réponse une url qui permet de consulter la valeur ajoutée :
        res.location(`/api/tasks/${addedTask.id}`);
            // Au lieu d'écrire juste /api/tasks/id, on demande l'id de la valeur qui vient d'être créée, addedTask, et à laquelle l'API a attribué un id (on demande l'id de addedTask, pcq taskToAdd n'a pas d'id)
        res.status(201).json(addedTask)
    },

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    update : (req, res) => {
        //! finir la fonctionnalité update. Le principe est le même que le updateStatus mais vous devez modifier TOUT l’objet
        const id = +req.params.id;
        const newTasksInfos = req.body;

        // Vérifier si la tâche existe :
        // La trouver via son id...
        const task = fakeTaskService.findById(id);
        // ... Si pas d'id trouvé :
        if(!task) {
            res.status(404).json( {
                statusCode : 404,
                message : "Tâche non trouvée"})
        }

        // Si la tâche existe, on peut la modifier :
        const updatedTask = fakeTaskService.update(id, newTasksInfos);
        res.status(200).json(updatedTask);
        
        
    },

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    updatedStatus : (req, res) => {
        //! finir la fonctionnalité updateStatus. Il vous faudra, dans le service, une fonction qui prend en paramètre l’id et le nouveau statut, recherche la tâche correspondante et, si la tâche a été trouvée, modifie son statut. Votre contrôleur devra renvoyer 404 si la tâche que vous essayez de modifier n’existe pas. Sinon, renvoie la tâche avec les nouvelles modifications. 
        const id = +req.params.id;
        const newStatus = req.body.isDone;

        // D'abord vérifier si la tâche existe :
        const task = fakeTaskService.findById(id);

        if(!task) {
            res.status(404).json( {
                statusCode : 404,
                message : "La tâche que vous souhaitez modifier n'existe pas."})
                // = ...alors on renvoie un status 404 et un message json.
        }

        const updatedTask = fakeTaskService.updateStatus(id, newStatus);

        res.status(200).json(updatedTask);
    },

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    delete : (req, res) => {
        //! finir la fonctionnalité delete. Faire une fonction dans le service qui reçoit l’id de la tâche à supprimer. Dans un premier temps, vérifier si la tâche existe, si pas, renvoyez false. Si elle existe, la supprimer du tableau (tips : filter ) et renvoyer true. Votre controleur, quand il utilisera la méthode du service, obtiendra un booléen pour savoir si oui ou non, la tâche a été supprimée.

        const id = +req.params.id;

        // Si la fonction delete(id) renvoie true :
        if(fakeTaskService.delete(id)) {
            res.sendStatus(204);
            //* Attention : si on n'a qu'un statut à envoyer, on fait sendStatus et pas status tout seul, car sans send le serveur attend toujours l'envoi d'autres infos et ne met pas fin à la request.
        } else { //TODO faire un else ici mais pourquoi??
        // Sinon, si elle renvoie false :
        res.status(404).json( {statusCode : 404, message : "Suppression impossible, la tâche n'existe pas"})
        }

    }

}

// On le rend importable en l'exportant :
module.exports = taskController;