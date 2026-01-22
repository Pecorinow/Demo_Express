//! Créer un service pour la gestion des utilisateurs avec find() 

const User = require('../../models/user.model');

const userService = {
    find : async() => {
        try {
            //? Récupérer ce qu'on reçu dans la query pour rajouter des filtres de recherche :
            


            const users = await User.find()
            
            return users;
        }
        catch(err) {
            console.log(err);
            throw new Error(err);
        }
    }
}

module.exports = userService;