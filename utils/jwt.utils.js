//* Ici, création d'un TOKEN :
// Token = "jeton" d'autorisation, qui permet de savoir qui fait une requête et lui donner, ou non, l'autorisation de faire cette requête.
// Exemple : Pour pouvoir modifier la page insta de Bob, il faut avoir les accès de Bob (mail et password).

const jwt = require('jsonwebtoken');

// Récupération des variables d'environnement, nécessaires pour coder et décoder le token :
const { JWT_ISSUER, JWT_AUDIENCE, JWT_SECRET } = process.env;

// On va créer un objet, ou utilitaire, dans lequel il y aura 2 fonction :
// - Une pour créer un token à  partir de certaines infos
// - Une pour décoder un token et récup les infos contenues dedans
const jwtUtils = {
    //todo return token :
    generate : (user) => { 
        // La création de notre token peut planter => On renvoie une promesse :
        return new Promise( (resolve, reject) => {
            //? 1) Créer un "playload", un objet qui continet certaines données du usser qu'on veut cacher dans le token.
            // Attention, on n'y met pas d'u-infos sensibles (mot de passe, email, adresse, nudes...) car il est facilement décodable.
            // Claims : données qu'on met dans le playload.
            const playload = {
                id : user._id, // Comme d'hab, le _ vient de celui donné dans Mongo DB.
                role : user.role // Pour que le Front puisse faire on ne sait-quoi, peut-être des tartes ?🍰
            }

            //? Paramétrer les options pour créer notre token : = comment va être créé le token :
            const options = { // Tout ce qui est dans 'options' vient de la librairie jwt, donc ici algorithm, expiresIn.... :

                // Choix de l'algo de hashage du token, par défaut HS256 :
                algorithm: 'HS256',
                // Choix dela date d'expiration du token :
                expiresIn : '3d',
                // À QUI est destiné le token (le site) :   (strings, ou tableaux de strings)
                audience : JWT_AUDIENCE,
                // QUI qui envoie le token (ici, notre API) :   (strings, ou tableaux de strings)
                issuer : JWT_ISSUER
                //* audience et issuer : leur variables d'environnement ont été stockées dans .env et importées en haut de ce fichier.
            }

            //? 3) Création du token :
            // Pour créer le token, on a besoin des paramètres suivants :
            // - playload (les infos stockées dan sle token, pour savoir qui est le user)
            // - un secret : LE code secret qui va servir à signer (ou encoder) et à décoder le jeton. Il ne doit JAMAIS être divulgué ni être mis sur Git, sinon n'importe qui peut le décoder.
            // - les options : la façon dont va être encodé le token.
            // - Attention, la méthode sign ne renvoie pas de prommess, mais peut échouer quand-même => le dernier paramètre de la méthode sign est la fonction exécutée à la fin de la création du token.
            jwt.sign(playload, JWT_SECRET, options, (error, token) => {
                // Si il y a eu erreur lors de la signature, le param 'error' sera rempli et 'token' sera vide :
                if(error) {
                    reject(error); /* Si erreur, on rejette la promesse*/
                }   // Pas besoin de faire else, car

                // Si tout s'est bien passé, error est vide et token est rempli :
                resolve(token); /* Si pas d'erreur, on résoud la promesse et on renvoie le token*/

            })
        })

    },

    //todo return infoUser :
    decode : (token) => {
        return new Promise ((resolve, reject) => {
            //? 1) Si rien dans paramètre token, promese non tenue
            if(!token) {
                reject(new Error('Pas de toke reçu'));
            }
            //? 2) Si il y a bien un token, on peut le décoder :
            // Pour ça, méthode verify qui prend plusieurs paramètres :
            //- Le token à décoder
            //- Le secret
            //- les options
            //- la fonction qui sera lancée à la fin de la vérification :

            const options = {
                audience : JWT_AUDIENCE,
                issuer : JWT_ISSUER
            }
            jwt.verify(token, JWT_SECRET, options, (error, playload) => {
                // Si il y a eu erreur pendant le décodage, error est rempli et playload est vide :
                if(error) {
                    reject(error); /* Si erreur, on rejette la promesse*/
                }

                // Si pas d'erreur pendant le décodage, error est vide et playload est rempli :
                resolve(playload);/* Si pas d'erreur, on résoud la promesse et on renvoie le token*/
            })
        })
    }
}

module.exports = jwtUtils;