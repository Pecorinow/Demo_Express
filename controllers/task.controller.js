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
        const id = +req.params.id; // = on va chercher l'id dans les paramètres de la request (pcq il ne se trouve pas ailleurs)
        const task = fakeTaskService.findById(id);
        // Si l'id n'existe pas = si pas de tâche correspondante...
        if(!task) {
            res.status(404).json( {
                statusCode : 404,
                message : "Tâche non trouvée"})
                // = ...alors on renvoie un ststus 404 et un message json.
        }

        // Mais si la tâche existe :
        res.status(200).json(task); 
 
    },

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    getbyUser : (req, res) => {res.send(501)},

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    insert : (req, res) => {
        //* Opérations AVANT d'être passé par fakeTaskService :
        const taskToAdd = req.body;
            // = On crée une variable taskToAdd qui correspond au body de la request.

       

        //* Opérations APRÈS être passé par fakeTaskService
        const addedTask = fakeTaskService.create(taskToAdd);
            // = on crée une nouvelle variable pour la tâche ajoutée, addedTask, qui a été ajoutée à la DB via la fonction create(taskToAdd)
            // Cette fonction va remanier taskToAdd, lui donner un id, et la renvoyer à taskController pour créer addedTask.

        // Pour respecter les principes REST, on doit ajouter à la réponse une url qui permet de consulter la valeur ajoutée :
        res.location(`/api/tasks/${addedTask.id}`);
            // Au lieu d'écrire juste/api/tasks/id, on demande l'id de la valeur qui vient d'être créée, addedTask, et à laquelle l'API a attribué un id (on demande l'id de addedTask, pcq taskToAdd n'a pas d'id)
        res.status(201).json(addedTask)
    },

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    update : (req, res) => {res.send(501)},

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    updatedStatus : (req, res) => {res.send(501)},

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    delete : (req, res) => {res.send(501)}

}

// On le rend importable en l'exportant :
module.exports = taskController;