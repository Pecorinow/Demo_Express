const Category = require('../../models/category.model'); // On importe le category.model :

const categoryService = {
    // Cete fois, on va créer notre vrai service, mais ce seront les mêmes fonctions que notre fakeService qui seront à l'intérieur :

    // On ajoute des async devant nos fonctions, et des await à l'intérieur, car ça peut mettre du temps :
    find : async() => {
        try {
            // On va interroger la DB de Mongoose (ça peut prendre du temps ou planter donc c'est une promesse => await)
            const categories = await Category.find();
            return categories;
        } catch(err) {
            console.log(err);
            throw new Error(err);
    }
    } //* -> Quand c'est fait, importer ce categoryService dans le controller, et faire le reste.
    ,
    findById : async(id) => {
        try {
            const searchedCategory = await Category.findById(id);
            return searchedCategory;
        }
        catch(err) {
            console.log(err);
            throw new Error(err);
        }
    },

    create : async(category) => {
        try {
            // Dans category, il y a les infos contenues dans le body
            // Dans Category, il y a le model crée dans category.model.js
            //* Objectif 1 : On va créer l'objet categoryToAdd à ajouter à partir du model Category :
            const categoryToAdd = Category(category);
            // Objectif 2 : On va "sauvegarder" (donc insérer) notre categoryToAdd dans la DB :
            await categoryToAdd.save();
            // Si tout s'est bien passé, on renvoie la nouvelle catégory :
            return categoryToAdd;
        }
        catch(err) {
            console.log(err);
            throw new Error(err);
        }
    },

    findByName : async(name) => {
        try {
            // Trouver dans la DB une catégorie qui possède le nom reçu en paramètres :
            // const searchedCategory = await Category.findOne( { name : name } );
            const searchedCategory = await Category.findOne( { name } ); // = Dans la collection Category, on cherche un objet dont le nom correspond à celui reçu en params.
            if (searchedCategory) {
                // Si une catégorie a été trouvée, c'est que le name existait déjà, donc on rnvoie TRUE
                return true;
            } else { // Si aucune catégorie n'a été trouvée, c'est que le nom n'existe pas, donc on renvoie FALSE
                return false;
            }

        } catch(err) {
            console.log(err);
            throw new Error(err);
        }
    },
}

module.exports = categoryService;