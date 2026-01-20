const argon2 = require("argon2");

const User = require('../../models/user.model');

const authService = {
    findByCredential : async(credentials) => {
        try {
            // Trouver l'utilisateur dont le mail est = à celui reçu.

            const userFound = await User.findOne({email : credentials.email});

            // Si pas d'utilisateur trouvé, on sort.
            if(!userFound) {
                return undefined;
            }

            // Si utilisateur trouvé, on vérifie si le mdp entré correspond à celui de la DB, grâce à un Booléen True or False dans verify() :

            const checkPassword = await argon2.verify(userFound.password, credentials.password)
                // userFound.password = celui trouvé dans la DB
                // credentials.password = celui rentré par l'utilisateur
            
            // Si pas, on sort
            if(!checkPassword) {
                return undefined;
            } else {
                // Si oui, alors le mail et pdp sont bons => on peut renvoyer l'utilisateur :
                return userFound;
            }

            
        } catch(err) {

        }
    },

    emailAlreadyExists : async(email) => {
        try {
            // On cherche un utiliateur dont l'email est = à celui reçu en paramètres :
           const userFound =  await User.findOne({email : email});
           if(userFound) { // Si l'utilisateur est trouvé alors l'email existe :
                return true
           } else  { // Sinon :
                return false;
           }
        }
        catch(err) {
            console.log(err);
            throw new Error(err);
        }
    },

    create : async(user) => { // C'est ici qu'on va hasher les mots de passe :
        try {
            // On va hasher et modifier le mdp de l'utilisateur pour ajouter la version hashée en DB :
            const hashedPassword = await argon2.hash(user.password); // await, car c'est une promesse, puisque la méthode hash peut planter.

            // On eremplace le mdp de l'utilisateur par le mdp hashé :
            user.password = hashedPassword;

            // Et on sauve le user en DB :
            const userToCreate = User(user);
            await userToCreate.save();

        
            return userToCreate;


        }
        catch(err) {
            console.log(err);
            throw new Error(err);
        }
        
    }
}

module.exports = authService;