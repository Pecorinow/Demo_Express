const {Request, Response} = require('express');

const fakeCategoryService = require('../services/fake/fakeCategory.service');

const categoryService = require('../services/mongo/category.service');

// Création de notre categoryController
const categoryController = {
    //On va créer autant de fonctions qu'il y a de fonctionnalités pour la tâche (getAll, getById, insert, delete...), en leur donnant pour bien faire le même nom que ce qu'on a créé sur Insomnia :
        /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    getAll : async(req, res) => {
        try {
            // On appelle notre service qui va chercher dans la DB :
             const categories = await categoryService.find();
            // Si ça marche, on envoie les catégories :
            res.status(200).json(categories); 
        } 
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
    getbyId : async(req, res) => {
        const id = req.params.id; //On a enlevé le + devant le req, car en utilisant la vraie DB, l'id devient une chaine de caractère constituée de lettres et de chiffres.

        try {
        const category = await categoryService.findById(id);

        // Si category est undefined ou null :
        if (!category) {
            res.status(404).json( { statusCode : 404, message : "Catégorie non trouvée"})
        } // sinon, renvoyer la tâche :
        res.status(200).json(category);
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
    insert : async(req, res) => {

        const categoryToAdd = req.body;        

        try {
            const exists = await categoryService.findByName(categoryToAdd.name);

            if (exists) {
                res.status(409).json({ statusCode: 409, message : `La catégorie ${categoryToAdd.name} existe déjà`});
            }
            else {
                // Si elle n'existe pas, on peut la créer :
                const insertedCategory = await categoryService.create(categoryToAdd);

                res.location(`/api/categories/${insertedCategory.id}`);
                res.sendStatus(201).json(insertedCategory);
            }
        }
        catch(err) {
            res.sendStatus(500);
        }

        // Ancienne version avec la fake DB :
        // // Créer la variable du nom de la nouvelle catégorie :
        // const newCategoryName = categoryToAdd.name;

        // // Créer la variable newCategory, surlaquelle on applique la fonction de recherche par nom :
        // const newCategory = fakeCategoryService.findByName(newCategoryName);
    
        // // Si la catégorie existe :
        // if(newCategory) {
        //     res.status(409).json( {statusCode : 409, message : "Conflit ⚔️  - Une catégorie portant ce nom existe déjà"})
        // }
        // // Sinon, la créer :
        // const addedCategory = fakeCategoryService.create(categoryToAdd);

        // res.location(`/api/categories/${addedCategory.id}`);

        // res.status(201).json(addedCategory)
        
},

        /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    update : (req, res) => {
        res.send(501)
    },

        /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    delete : (req, res) => {
        res.send(501)
    } 

}

// On le rend importable en l'exportant :
module.exports = categoryController;