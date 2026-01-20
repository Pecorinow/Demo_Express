const authService = require('../services/mongo/auth.service');
const jwtUtils = require('../utils/jwt.utils');

const authController = {
    register : async(req, res) => {
        try {
            // on récup le body de la request qui contient les infos de l'utilisateur :
            const userToAdd = req.body;

            // On vérifie si l'email n'a pas déjà été utilisé :
            if(await authService.emailAlreadyExists(userToAdd.email)) {
                res.status(409).json( {statusCode : 409, message : 'Cet email existe déjà'})
            } 

            // On tente d'ajouter l'utilisateur :
            const userCreated = await authService.create(userToAdd);

            res.location(`/api/user/${userCreated._id}`);
            res.status(201).json({
                id : userCreated._id, // Le _ vient de MongoDB
                firstname : userCreated.firstname,
                lastname : userCreated.lastname
            })
        } catch(err) {
            console.log(err);
            
            res.sendStatus(500);
        }
    },

    login : async(req, res) => {
        
        try{
            // Récup les infos de connexion dans le body :
            const credentials = req.body;

            // Tenter de trouver l'utilisateur qui correspond à ces données :
            const userFound = await authService.findByCredential(credentials);

            // Si pas d'utilisateur trouvé => les infos n'éteiant pas bonnes :
            if(!userFound) {
                res.status(401).json({statusCode : 401, message : 'Les informations de connexion sont erronées'})
            } else {
                // On va lui générer un token :
               const token = await jwtUtils.generate(userFound);
                    // La fonction generate est importée de jwt.utils.js.
                    // Si ça plante, on est renvoyé au catch(err) direct, si ça réussit on continue ici-en-dessous.

                // On renvoie quelques infos de l'utilisateur  le token :
                res.status(200).json({
                    id : userFound._id,
                    firstname : userFound.firstname,
                    lastname : userFound.lastname,
                    token : token// ou juste token
                })
            }
        }
        catch(err) {
            console.log(err);
            
            res.sendStatus(500);
        }
    }

}

module.exports = authController;