//* Exercice :
//Pour les tâches :  

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

    find : async(query) => {
        try {
            //? Récupérer ce qu'on reçu dans la query pour rajouter des filtres de recherche :
            const {isDone} = query;
            //* Vérifier si isDone est bien présent dans la query pour créer un nouveau filtre :
            let isDoneFilter; // Valeur sera modifiée dans le if et le else => let
            if(isDone === undefined) { // Si isDone est undefined...
                isDoneFilter = {}; // ...alors le filtre est vide.

            // Si isDone est rempli :
            } else {
                // Filtre pour le find : {nomChampsEnDB : nomVariableContenantValeurRecherchee}
                isDoneFilter = {isDone : isDone}
            } // => Aller le rajouter dans le find() juste en dessous ! ⬇️

            //* Vérifier s'il y a des catégories dans la query :
            let categoryFilter;
            // Si pas de categoryId dans la query => filtre vide :
            if(!categoryFilter ){
                categoryFilter = {};
            }
            // Sinon, comme on pourrait rechercher plusieurs catégories, on va regarder si c'est un tableau :
            else if(Array.isArray(categoryId)) {
                categoryFilter = {categoryId : {$in : categoryId} }
                    // { nomChampsDB : { $in : valeursRecherchées } }
                    // = Parmi les noms de champs en DB, trouve ceux dont la valeur est dans la query
            }

            // Si pas de tableau, on cherche une seule catégorie :
            else {
                categoryFilter = {categoryId : categoryId};
            }


            // Populate : permet de rajouter les infos reliées à notre objet task grâce aux ref qu'on a établi dans le Schema :
            const tasks = await Task.find(isDoneFilter)
                                    .and(categoryFilter)
                                    .populate( { 
                                        path : 'categoryId',
                                        select : { id : 1, name : 1, icon : 1}
                                    } )
                                    // = rajoute les infos du model Category, en sélectionnant les infos id, name et icon.
                                    // 1 = TRUE = on veut ces infos-là (1 != un number dans ce cas).
                                    .populate( {
                                        path : 'fromUserId',
                                        select : {id : 1,firstname : 1,lastname : 1 }
                                    })
                                    .populate( {
                                        path : 'toUserId',
                                        select : {id : 1,firstname : 1,lastname : 1 }
                                    });
            // ATTENTION : On est en NO-SQL => pas de lien concret entre les éléments, ici on pourrait ajouter des éléments qui n'existent pas dans Category ou User, ça nous renverrait juste les infos existantes en ignorant celles qui n'existent pas.
            // Contrairement au SQL où il y a un lien tangible entre les éléments.
                                    
            return tasks;
        }
        catch(err) {
            console.log(err);
            throw new Error(err);
        }
    },  //* -> Quand c'est fait, importer ce taskService dans le taskController, et faire le reste.

    findById : async(id) => {
        try {

            const searchedTask = await Task.findById(id)
                                // Aussi ok .findOne { id : ...};
                                .populate( {
                                    path : 'categoryId',
                                    select : { id : 1, name : 1, icon : 1 }
                                })
                                .populate( {
                                    path : 'fromUserId',
                                    select : {id : 1,firstname : 1,lastname : 1 }
                                })
                                .populate( {
                                    path : 'fromUserId',
                                        select : {id : 1,firstname : 1,lastname : 1 }
                                });
                                            
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

    delete : async(id) => {

        try {
            // 2 solutions :
            // 1) deleteOne({}) avec un filtre qui renvoie un objet avec une propriété deleteCount, dans laquelle il y a le nombre d'éléments qui ONT ÉTÉ supprimés (ici, 1 pcq One, ou 0 si l'id n'a pas été trouvé).
            // => Renvoie un Booléen 0 ou 1.
            // const deleteInfo = await Task.deleteOne( {_id : id} );
            // le _ vient de la façon dont l'id a été écrit par défaut dans la DB Mongo.

            // if(deleteInfo.deletedCount === 0) {
            //     return false
            // } else {
            //     return true;
            // }; // peut aussi s'écrire :
                // return deleteInfo.deleteCount !== 0;

            //2) findByIdAndDelete(id) : Va d'abord faire la méthode findById pour trouver l'élément à supprimer => Renvoie alors l'élément (ou pas, si pas trouvé) qui VA être supprimé :
            const deletedTask = await Task.findByIdAndDelete(id);

            if(deletedTask) {
                return true
            } else {
                return false
            }

        } catch(err) {
            console.log(err);
            throw new Error(err);
        }
        
    }
}

module.exports = taskService;