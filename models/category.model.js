const { Schema, model } = require('mongoose'); // Importer Mongoose pour créer des Schemas.

//* 1) Créer un nouveau schema pour décrire à quoi ressemble une category :
const categorySchema = new Schema({
    name : {
        type : String,
        required : true, // obligatoire
        unique : true, // pas deux fois le même nom
        trim : true, // gère les espace inutiles s'il y en a
    },
    icon : {
        type : String,
        required : true,
        unique : true,
    }
}, { // Option de collection :
    collection : 'Category',// Mettre le nom de la collection avec laquelle on drvra intéragir en DB (voir ce qu'on a écrit dans Mongoose)
    timestamps : true
    // Pour ajouter 2 champs automatiquement :
    // createAt : date -> date de création de la catégorie
    // updateAt : date -> date de dernière modification
}

); // -> sert à décrire le schema

//* 2) Créer un model à partir de ce schema :
// Premier paramètre : le nom du model ;
// Deuxième paramètre : le schéma de ce model :
const Category = model('Category', categorySchema);

// Ensuite on exporte le model :
module.exports = Category;