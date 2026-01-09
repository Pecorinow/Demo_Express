// Log : middleware (fonction) qui gère la connection et la déconnection.
const { Request, Response } = require('express');

const logMiddleware = () => {
    /**
     * @param {Request} req
     * @param {Response} res
     */

    // Un middleware = fonction qui doit revoyer la requête :
    return (req, res, next) => {
        // req contient la request entrante où on ira chercher les infoq qui nous intéressent
        // res contient la réponse, et nous permettra de stopper la request si nécessaire.
        // next est une fonction qu'on exécutera pour permettre à la requete de continuer sa route.
        const method = req.method;
        const url = req.url; 
        const date = new Date();

        // idéalement, ça devrait donner ça :
        console.log(`${method} ${url} ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`)
        // = la méthode, l'url, la date et l'heure = GET/ api/tasks/2 09/01/2025  11.28
        // = la request + la date et l'heure de la req 

        next(); // L'appel de la fonction next permet d'indiquer que la req continue son chemin ("au suivant!"), sinon pas de fin à larequest.

    }

}

module.exports = logMiddleware; // Comme à chaque fois, on doit pouvoir l'exporter.