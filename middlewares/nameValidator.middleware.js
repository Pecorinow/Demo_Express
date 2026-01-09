const { Request, Response } = require('express');

const nameValidatorMiddleware = () => {
    /**
     * @param {Request} req
     * @param {Response} res
     */
    return (req, res, next) => {
        // Récup le nom dans la request
        const requestToCheck = req.body;
        const nameToCheck = requestToCheck.name;
        const nameToCheckLower = nameToCheck.toLowerCase();

        const offensiveNames = ["Croute", "Mouise", "Louse", "Jordan", "Donald", "Elon","Jean-Marie", "Andrew", "Vladimir", "Gérard"]

        // Vérifier si le nom est offençant
        if(offensiveNames.some(name => nameToCheckLower.includes(name.toLowerCase()))) {
            res.status(403).json( { statusCode : 403, message : "Non mais ho !"})
        } else {
            next();
        }
        // Si oui, arrêter la request + status ?
        // Si non, continuer la request
    }
}

module.exports = nameValidatorMiddleware;