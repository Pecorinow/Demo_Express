const User = require("../../models/user.model");

const userAuthorizationMiddleware = () => {
    return async(req, res, next) => {
        // Vérifier si l'id du token stocké dns la requête correspond à l'id dans la route de la requête, pour vir si on a le droit d'accéder à la ressource :
        //? 1) Récup l'id dans la route :
        const userRouterId = req.params.id;
        console.log('userRouterId' + userRouterId);

        //? 2) Récup l'id se trouvant dans le token, et qui a été ajouté dans la requêt e :
        const userId = req.user.id;
        console.log('userId' + userRouterId);

        //? 3)Récupérer le rôle de l'utilisateur qui fait la requête, car s'il est admin, il a tous les droits :
        // 2 options :
        // 1) Soit on le récupère dans la requête, puisqu'il était dans le token.
        // Inconvénient : Si le rôle de la personne a changé entre la création du token et maintenant, il a toujours l'ancien rôle dans le token.
        // 2) Soit on fait une requête vers la DB pour connaître son rôle à l'instant T :
        try {
            const tokenUser = await User.findById(userId);
            // Si  on n'a pas récup d'utilisateur, c'est que l'utilisateur a été supprimé de la DB entre temps :
            if(!tokenUser) {
                res.status(404).json( {statusCode : 404, message : 'Vous n\'existez pas.'} );
            } else {
                // Si par contre l'utilisteur existe, on vérifie son rôle :
                // S'il est admin, il a l'accès :
                if(tokenUser.role === 'Admin') {
                    next();
                }
                // Sinon, si les deux id sont les mêmes, ce sont ses tâches, donc il a l'accès aussi :
                else if(userId === userRouterId) {
                    next();
                }
                // Sinon, c'est qu'il ni Admin, ni la personne dont il osuhaite regarder les tâches. C'est un gros stalker => 
                else {
                    res.status(403).json({statusCode : 403, message : 'Vous n\'avez pas les droits d\accès à ces informations, j\'appelle la police !'});
                }
                
            }
        } catch(err) {
            console.log(err);
            
            res.status(500).json( {statusCode : 500, message : 'La DB a planté sorry'} )
        }
    }
}

module.exports = userAuthorizationMiddleware;