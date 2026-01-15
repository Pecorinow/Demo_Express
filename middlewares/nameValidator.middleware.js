const { Request, Response } = require('express');

const offensiveNames = ["Croute", "Mouise", "Louse", "Jordan", "Donald", "Elon","Jean-Marie", "Andrew", "Vladimir", "Gérard"]

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

        // Vérifier si le nom est offençant
        if(offensiveNames.some(name => nameToCheckLower.includes(name.toLowerCase()))) {
            res.status(400).json( { statusCode : 400, message : "Non mais ho !"})
        } else {
            next();
        }
        // Si oui, arrêter la request + status ?
        // Si non, continuer la request
    }
    //* Après, on va dans le taskRouter pour insérer le middleware dans le post.
}

module.exports = nameValidatorMiddleware;