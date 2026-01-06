//* TOUT COMMENCE ICI :
// Ce fichier est le pillier de notre serveur, c'est ici qu'on va
// 1) Créer le serveur,
// 2) Importer le routeur depuis le dossier routes (où sont configurées les différentes routes possibles) et l'utiliser,
// 3) Écouter le serveur sur le port 3000.

console.log('serveur node ok 🙂');

//! 1)Importer Express + créer le serveur
const express = require('express'); // Import depuis le node_module la librairie qui s'appelle express.
const server = express(); // Création du serveur express.

//? Récupération des variables d'environnement :
const {PORT} = process.env; // = J'extraie ce qui m'intérese (ici PORT) hors de process.env

//! 2) Traiter les requêtes :
//* On avait commencé en écrivant tout ça, mais les requêtes se traitent dans d'auters fichiers :
// En get sur http://localhost:3000/ tout court = '/' :
// server.get('/', (req, res) => { // Ici, on a déjà une méthode get qui est proposée dès qu'on écrit le . juste après server, pas besoin de faire un long GET.
//     res.send({message : 'Ça marche c\'est incroyable'}, 200); // avec la méthode .send, on peut envoyer un message et le numéro de mldhfufr de la réponse.
// })

// Et en get sur http://localhost:3000/products :
// server.get('/products', (req, res) => { 
//     res.send({message :'Regarde mes beaux produits !'}, 200);
// })


//* Comme les requêtes ne se traitent plus ici, on importe le router depuis le fichier index.js (dans le dossier routes) :

// Indiquer que le routing se trouve dans le dossier 📁routes :
const router = require('./routes'); // = import de l'objet router depuis index.js.
server.use('/api', router); // = indiquer au serveur d'utiliser le router importé.
//* On ajoute /api comme condition pour lancer le router, pour préciser qu'on veut avoir accès à l'API en backend, donc à l'url http://localhost:3000/api/tasks, et pas à la liste des tâches (ou catégories, si l'url finissait par category) qui apparaîtrait en front si on lançait http://localhost:3000/tasks sans le /api.
// -> Après, la suite se passe dans le fichier index.js.


//! 3) Écouter le serveur sur un port spécifique
server.listen(3000, () => {
    console.log(`🌱Express server succesfully started on beautiful port ${PORT}, hurrayyy !`);
})