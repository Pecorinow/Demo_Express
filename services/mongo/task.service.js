// Pour les tâches :  

// Créer un nouveau service dans le dossier mongo avec toutes les mêmes méthodes que dans le fakeTaskService. 
 
// 1) Permettre l’ajout d’une nouvelle tâche (insert)  
// - Créer et compléter la méthode create du service pour créer et sauvegarder la tâche 
// - Modifier votre taskController pour appeler la création du nouveau service et plus de l’ancien 
// (⚠️ Il faudra sans doute modifier la structure de votre body dans Insomnia puisque vous devez maintenant respecter le model) 
 
// Rajouter au moins 2 nouvelles tâches.

// 2) Permettre la récupération de toutes les tâches (getAll)  
// (Vous afficherez les tâches telles qu’elles sont en db, ensemble, à la correction, on verra comment récupérer le nom et l’icone de la catégorie et le prénom de l’utilisateur) 

// 3) Permettre la récupération d’une tâche en particulier via son (getById) 
// (Vous afficherez la tâche telle qu’elle est en db, ensemble, à la correction, on verra comment récupérer le nom et l’icone de la catégorie et le prénom de l’utilisateur) 

// 4) Challenge : Permettre la récupération des tâches données et reçues d’un utilisateur via son id. 
// - Vous devrez refaire les méthodes dans le service mais en appelant la db 
// - Vous devrez modifier dans la route le paramètre pour que ce ne soit plus le nom du user mais son id. 
// - Vous devrez modifier votre contrôleur pour récupérer le bon paramètre et appeler les nouvelles méthodes faites dans le service.

const Task = require('../../models/task.model');

const taskService = {

    find : async() => {
        try {
            const tasks = await Task.find();
            return tasks
        }
        catch(err) {
            console.log(err);
            throw new Error(err);
        }
    },  //* -> Quand c'est fait, importer ce taskService dans le taskController, et faire le reste.

    findById : async(id) => {
        try {
            const searchedTask = await Task.findById(id);
            return searchedTask;
        }
        catch(err) {
            console.log(err);
            throw new Error(err);
        }
    },

    create : async(task) => {
        try {
            // Dans task, il y a les infos contenues dans le body
            // Dans Task, il y a le model crée dans task.model.js
            //* Objectif 1 : On va créer l'objet taskToAdd à ajouter à partir du model Task :
            const taskToAdd = Task(task);
                // Ici, taskToAdd = l'objet qu'on souhaite créer
                // Task = le modèle sur base duquel on va le créer
                // task = les infos du body, qui vont être modelées selon le model Task.
                // Donc : const objetCréé = Model(infos du body)
            //* Objectif 2 : On va "sauvegarder" (donc insérer) notre taskToAdd dans la DB :
            await taskToAdd.save();
            // Si tout s'est bien passé, on renvoie la nouvelle catégory :
            return taskToAdd;
        }
        catch(err) {
            console.log(err);
            throw new Error(err);
        }
    }, //* -> Quand c'est fait, importer ce taskService dans le taskController, et faire le reste.

    findToUser : async(userId) => { // le userId est défini dans le taskContoller.
        try {
            const tasksAssignedToUser = await Task.find({toUserId : userId})
            return tasksAssignedToUser;
        }
        catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },  //* -> Quand c'est fait, importer ce taskService dans le taskController, et faire le reste.

    findFromUser : async(userId) => { // le userId est défini dans le taskContoller.
        try {
            const tasksAssignedByUser = await Task.find({fromUserId : userId})
            return tasksAssignedByUser;
        }
        catch(err) {
            console.log(err);
            throw new Error(err);
        }
    },  //* -> Quand c'est fait, importer ce taskService dans le taskController, et faire le reste.
}

module.exports = taskService;