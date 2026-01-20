const {Request} = require('express');
const jwtUtils = require('../../utils/jwt.utils');
// Ce middleware vérifie si un toke a bien été fourni.
// Si oui, on continue la req.
// pas de token, on arrête la req et on met un code erreur.
// -> Resultat : il faut être connécté pour accéder à la ressource.

const authenticationMiddleware = () => {
    /**
     * @param {Request} req
     */
    return async(req, res, next) => {
        // Le token reçu dans Authorization doit ressembler à "Bearer TokenReçuQuiEstSuperLongEtBizarre".

        // ? Récupérer le header Authorization :
        const authorization = req.headers.authorization;
        console.log(authorization);

        // ? Si le token n'a pas été ajouté dans Authorization (sur Insomnia), le console.log renverra undefined -> On met fin à la requête : la personne n'est pas connecté :
        if(!authorization){
            res.status(401).json({statusCode : 401, message :'Vous devez être connecté'});
        }
        // ? Si qlq  a envoyé qlq-chose dans Authorization comme "Bearer", sans envoyer le token après "Bearer" -> fin de la requête :
        // authorization.split(' ') : permet de découper la chaine là où il y a un espace :
        // On obtient donc un tableau à deux cases : 
        // Dans la première [0] il y a Bearer
        // Dans la deuxième [1] il y a le token
        const token = authorization.split(' ')[1];
        if(!token) {
             res.status(401).json({statusCode : 401, message :'Vous devez être connecté'});
        }

        // ? S'il y a bien un token : on le décode :
        // TODO : décoder le token :
        // S'il y a un token, on essaie de le décoder :
        try {
            const playload = await jwtUtils.decode(token); // Le async est tout au-dessus, après le return.

            // TODO stocker le playload récupéré dans l'objet req
            // On stocke l'objet playload récupéré dans notre objet req, -> on peut savoir à tout moment dans la suite qui demande la request :
            // Pour ajouter une info dans la requête, on prend juste l'obejt req et on lui ajoute une nouvelle propriété à l'arrache (oui on peut faire ça askip). Attention, ne pas prendre un nom déjà utilisé (query, body, url..;)
            req.user = playload;
            
            // On continue la requête :
            next();
        
        }catch(err){
            console.log(err);
            
            // Si erreur, le décodage a planté, le token est erroné ou périmé => fin de la requête :
            res.status(401).json({statusCode : 401, message :'Vous devez être connecté'});
        }
    }
}

module.exports = authenticationMiddleware;