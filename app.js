console.log('serveur node ok 🙂');

//! 1)Importer Express + créer le serveur
const express = require('express'); // Import depuis le node_module la librairie qui s'appelle express.
const server = express(); // Création du serveur express.

//? Récupération des variables d'environnement :
const {PORT} = process.env; // = J'extraie ce qui m'intérese (ici PORT) hors de process.env

//! 2) Traiyter les requêtes :
// En get sur http://localhost:3000/ tout court = '/' :
server.get('/', (req, res) => { // Ici, on a déjà une méthode get qui est proposé dès qu'on écrit le . juste après server, pas besoin de faire un long GET.
    res.send({message : 'Ça marche c\'est incroyable'}, 200); // avec la méthode .send, on peut envoyer un message et le numéro de mldhfufr de la réponse.
})

// Et en get sur http://localhost:3000/products :
server.get('/products', (req, res) => { 
    res.send({message :'Regarde mes beaux produits !'}, 200);
})

//! 3) Écouter le serveur sur un port spécifique
server.listen(3000, () => {
    console.log(`🌱Express server succesfully started on beautiful port ${PORT}, hurrayyy !`);
})