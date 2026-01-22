//? Middleware pour vérifier si l'utilisateur qui fait la requête possède au moins un des rôles autorisés reçus en paramètres.

// Import du model User :
const User = require('../../models/user.model')

// Note : le paramètre 'roles' sera un tableau avec tous les rôles autorisés.
const roleAuthorizationMiddleware = (roles) => {
    return async(req, res, next) => {
        //? 1) Savoir qui fait la requête => Récup l'id de l'utilisateur qui fait la requête :
        const userId = req.user.id;

        //? 2) Chercher cet utilisateur dans la DB pour trouver son rôle :
        try {
            const userInDB = await User.findById(userId);

            // Si pas de userInDB trouvé :
            if(!userInDB) {
                 res.status(5404).json( {statusCode : 404, message : 'Vous n\'existez pas.'} );
            } 
            // Si il existe dans la DB :
            else {
                //? 3) On va vérifier si son rôle fait partie de srôles autorisés :
                // Si le tableau roles inclut un des rôles de l'utilisateur, il a les droits d'accès => On le laisse passer et au sivant !
                if(roles.includes(userInDB.role)) {
                    next();
                }
                // Si non, il n'a pas les droit d'accès => Dégage !
                else {
                    res.status(403).json({statusCode : 403, message : 'Vous n\'avez pas les droits d\accès à ces informations, j\'appelle la police !'});
                }
            }
        }
        catch(err){
            console.log(err);
            res.status(500).json( {statusCode : 500, message : 'La DB a planté sorry'} )
        }
    }
}

module.exports = roleAuthorizationMiddleware;