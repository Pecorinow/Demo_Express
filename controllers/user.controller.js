//! Créer le contrôleur pour la gestion des utilisateurs avec une méthode pour getAll 
const {Request, Response} = require('express');

const userService = require('../services/mongo/user.service');

const userController = {
    /**
         * 
         * @param {Request} req 
         * @param {Response} res 
         */
    getAll : async(req, res) => {
        const query = req.query;
        console.log(query);
        
        try {
            const users = await userService.find(query);
            const length = users.length;
            const dataToSend = {
                users,
                length
            }

            res.status(200).json(dataToSend);
        }
        catch(err) {
            console.log(err);
            res.status(500).json( { statusCode : 500, message : 'Erreur avec la DB 🫠'} );
        }
    }
}

module.exports = userController;