const { Schema, model, Types } = require('mongoose'); // Importer Mongoose pour créer des Schemas, des models, des Types.
const Category = require('./category.model'); // Nécessaire pour importer le categoryId
const User = require('./user.model');
 

//* 1) Créer un nouveau schema pour décrire à quoi ressemble une task :
const taskSchema = new Schema(
    {
        name : {
            type : String,
            required : true, // obligatoire
            trim : true, // gère les espace inutiles s'il y en a
        },
        isDone : {
            type : Boolean,
            required : true,
            default : false // On part du principe que isDone est faux de base.
        },
        before : {
            type : String
            // Ne pas mettre required => required : false par défaut
            //* => Ça veut dire qu'en Schéma Relationnel, on avait écrit NULL pour before.
        },
        categoryId : {
            type : Types.ObjectId,
                // Pour préciser que c'est un type ObjectId, on doit importer Types depuis Mongoose, nécessaire pour les objets bizarres.
                // importé de Mongoose via la ligne : const { Schema, model, Types } = require('mongoose');
            ref : Category,
                // Pour créer une référence vers le model Category (importé de category.model.js).
            required : true
        },
        fromUserId : {
            type : Types.ObjectId,
            ref : User,
            required : true
        },
        toUserId : {
            type : Types.ObjectId,
            ref : User,
            required : true
        }
    },
    {// Option de collection :
    collection : 'Task',// Mettre le nom de la collection avec laquelle on devra intéragir en DB (voir ce qu'on a écrit dans Mongoose)
    timestamps : true
    // Pour ajouter 2 champs automatiquement :
    // createAt : date -> date de création de la catégorie
    // updateAt : date -> date de dernière modification
    }
); // -> sert à décrire le schema

//* 2) Créer un model à partir de ce schema :
// Premier paramètre : le nom du model ;
// Deuxième paramètre : le schéma de ce model :
const Task = model('Task', taskSchema);

// Ensuite on exporte le model :
module.exports = Task;