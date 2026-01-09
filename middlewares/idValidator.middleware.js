// Router-lvl car ne s'applique que sur les routes où un id est nécessaire (Voir TaskRouter).

const { Request, Response } = require('express');

const idValidatorMiddleware = () => {
    /**
     * @param {Request} req
     * @param {Response} res
     */
    return (req, res, next) => {
        // récupérer l'id dans la req
        const id = +req.params.id;
        // Vérifier si l'id est un nombre
        if(isNaN(id)) {
            // Si pas un nombre, on stop la req (400)
            res.status(400).json( { statusCode : 400, message : "L'id doit être un nombre entier."})
        }
        // Si c'est un nombre, on continue la req comme si de rien n'était
        else
        {
            next();

        }
        
    }
}

module.exports = idValidatorMiddleware;