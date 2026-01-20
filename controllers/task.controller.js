// Import du type Request et Response pour la JSDoc juste en dessous (sinon, pas d'auto-complétion, pourquoi, je ne sais pas) :
const {Request, Response} = require('express');

// Import du fakeTaskService : :
const fakeTaskService = require('../services/fake/fakeTask.service');
const taskService = require('../services/mongo/task.service');

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
    getAll : async(req, res) => {
        try {
            // On appelle notre service qui va chercher dans la DB :
            const tasks = await taskService.find();
            const length = tasks.length;
            const dataToSend ={
                tasks,
                length
            }

            // Si ça marche, oin envoie les tâches :
            res.status(200).json(dataToSend);
        } // Si ça ne marche pas :
        catch(err) {
            console.log(err);
            res.status(500).json( { statusCode : 500, message : 'Erreur avec la DB 🫠'} );
        }
    },

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    getbyId : async(req, res) => {
        const id = req.params.id;
        
        try {
            const task = await taskService.findById(id);

            // Si task est undefined ou null = si l'id recherché n'existe pas :
            if (!task) {
                res.status(404).json( { statusCode : 404, message : "Tâche non-trouvée." } )
            } // Sinon, renvoyer la tâche :
            else {
                res.status(200).json(task);
            }
        } // Et si la DB plante :
        catch(err) {
            console.log(err);
            res.status(500).json( { statusCode : 500, message : 'Erreur avec la DB 🫠' } );
        }
    },

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    getByUser : async(req, res) => {
        // ! finir la fonctionnalité du getByUser. Il vous faudra, dans le service, une fonction qui recherche toutes les tâches de l’utilisateur. 
        const userId = req.params.id;

        //Version 2 : le pimp 🌟
        // TODO On souhaite afficher les tâches attribuées à l'utilisateur ET les tâches que lui-même a assignées :
        try {
            if(!userId) { // Si le user n'existe pas :
                res.status(404).json( { statusCode : 404, message : "Cet utilisateur n'existe pas 🫥" } )
            }
            else {
                const tasksAssignedToUser = await taskService.findToUser(userId);
                const tasksAssignedByUser = await taskService.findFromUser(userId);

                const dataToSend = {
                    tasksAssignedToUser,
                    tasksAssignedByUser
                }
                res.status(200).json(dataToSend);
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).json( { statusCode : 500, message : 'Erreur avec la DB 🫠' } );
        }
    },

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    insert : async(req, res) => {
        
        const taskToAdd = req.body;
            // = On crée une variable taskToAdd qui correspond au body de la request.

       try {
            const insertedTask = await taskService.create(taskToAdd);

            res.location(`/api/tasks/${insertedTask.id}`);
            res.status(201).json(insertedTask);
       }
       catch(err) {
            res.sendStatus(500);
       }
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
    delete : async(req, res) => {
        try {
            const id = req.params.id;
            if(await taskService.delete(id)) {
                res.sendStatus(204);
            } else {
                res.sendStatus(204).json( {statusCode : 404, message : 'Cette tâche \'a pas été trouvée'})
            }

        } catch(err) {
            res.sendStatus(500);
        }
    }

}

// On le rend importable en l'exportant :
module.exports = taskController;