# Web API avec Express
Une Api = un serveur qui va recevoir une **requête** (req), la traiter, potentiellement se "connecter" à des données (entre "" car les API intéragissent avec des données, mais pas forcément des bases de donnéés, même si c'est ça qu'on a fiat jusqu'ici) et renvoyer une **réponse** (res) qui possédera au minimm un statut (HttpCode), et potentiellement des données renvoyées (json, ou XML = ancêtre avant le json).
! Voir Schéma dans la documentaion du cours d'Aude !

## Les requêtes
Les raquêtes sont envoyées via le protocole HTTP et pssèdent plusieurs infos qui vont permettre au serveur de comprendre la demande.

Au minimum, il faut

* Un verbe (Verb) : Méthodede la requête. Indique au serveur l'ACTION qu'on veut réaliser.
    * **GET** : Récupérer quelque-chose (données, fichiers, images...)
    * **POST** : Envoyer quelque-chose. Peut être utilisé dans plusieurs contextes : envoyer les données d'un utilisateur pour les stocker qlq part et lui créer un compte, utilisateur qui envoie ses données pour se connecter (même si elles ne sont pas stockées, le POST sert juste à envoyer, pas focrément à stocker ce qui est envoyé)...
    * **PUT** : Modification **totale** de quelque-chose : si on modifie quelque-chose dans un objet, c'est tout l'objet qui est renvoyé après modification, comme si tout l'objet avait été modifié. Surtout utilisé pour les gros changements, mais en soi on pourrait l'utiliser pour tous types de changement, c'est juste moins propre si il n'y a que des petits changements à effectuer.
    * **PATCH** : Modification **partielle** : par exemple, si on ne modifie que son avatar sur son compte. Souvent, on utilise PATCH pour les images.
    * **DELETE** : Suppression de quelque-chose.

* Une URL : Sur quoi et comment on veut faire notre requête. Elle peut contenir plusieurs éléments :
    * Au minimum, une partie, ou segment statique :     = Le QUOI
    ex: http://localhost:3000/api/produits = il faut au moins ce segment-là si on veut faire des modif ou récupérer qlqch dans les produits.
    * Des paramètres _(optionnel)_ = partie dynamique, car la valeur va pouvoir changer :   = Le QUOI, mais plus précis
    ex : http://localhost:3000/api/produits/42 => Le 42 = partie dynamique, ici l'id d'un produit, qui pourra changer selon le produit qu'on voudra modifier.
    * Une **query** _(optionnel)_ : permet de rajouter des filtres   = Le COMMENT   = tout ce qui vient après le ? dans une url. Quand il y a plusieurs filtres à mettre, on sépare les filtres par un &.
    ex: http://localhost:3000/api/produits?category=bricolage&lowPrice=0&highPrice=15 = ici on demande les produits de la catégoiroe broicolage, entre 0 et 15€.

Ensuite, on peut ajouter :
* Un **body** = corps de la requête : Représente ce qu'on doit envoyer avec la requête (souvent du json, parfois du formData = format d'image, d'où les images qui sont souven traitées différemment du reste), les données qui peuvent être envoyées en même temps que la requête (un nouveau username, une nouvelle photo...). Donc souvent utilisé en POST, PUT ou PATCH.

* Des **headers** = En-tête de la requête : infos sur la requête qu part, on en repârlera plus longuement plus tard.

> [!Note]
> Cerytaines choses seron utilisées avec certains verbes particuliers :
>
> -> GET http://localhost:3000/api/produits\
> Verb + url statique\
> = Récupérer tous les produits
>
> -> GET http://localhost:3000/api/produits/42\
> Verb + url statique  + paramètre
> = Récupérer le produit dont l'id est 42
>
> -> GET http://localhost:3000/api/produits?offset=10&limit=30\
> Verb + url statique + query
> = Récupérer les produits à partir du 10e (offset) et en sélectionnant les 3 prochains (limit) = query de pagination.
> offset et limit : ce qui permet de mettre des limites dans la pagination, ex: je démarre à partir du numéro 10 et je ne veux en voir que 10 par 10.
> Permet aussi de changer la pagination par défaut d'une page si on veut voir plus que ce qui est montré.
>
> -> POST http://localhost:3000/api/produits\
> -> body : {"name" : "Fenouil", "price" = "infini"}\
> Verb + url statique + body\
> = Ajouter un nouveau produit avec les infos présentes dans le body
>
> -> PUT/PATCH http://localhost:3000/api/produits/42\
> -> body : {"name" : "Fenouil la fripouille", "price" = "infini"}\
> Verb + url statique + params + body\
> = Modifier globalement ou partiellement le produit dont l'id est 42.
>
> -> DELETE http://localhost:3000/api/produits/42\
> Verb + url statique + params\
> = Supprimer le produit dont l'id est 42.



## Les réponses
L'API va toujours renvoyer une réponsequi sera composée de :
* Un **statut** (statusCode, HTTPCode...) : code qui petrmet de savoir comment s'est passé la requête.
    * 2xx (dans les 200) : les codes de succès, selon le numéro ça peut vouloir dire "tout s'est bien passé et voici tes données", "tout s'est bien passé et je n'ai rien à te renvoyer"...
    * 3xx : indiquer une redirection (par exemple si la route d'un site a été changée, on peut voir un message de redirection pendant une certaine période pour préve,nir les utilisateirs que le site n'est plus à la même adresse).
    * 4xx : indiquer qu'une erreur connue de l'API est survenue (on n'a pas envoyé les bonnes infos de connection, ...)
    * 5xx : indiquer une erreur de serveur (serveur ne répond pas, db cassée, accès à la db ne fonctionne pas...) = plutôt des erreurs physiques.
* Des **données** _(optionnel)_ = Certaines requêtes, notammnet en GET, vont nous renvoyer des données (souvent en json), par exemple un objet qu'on aura essayé de récupérer. 

# Principes d'API REST :
Une API REST (Ful) (REpresentation State Transfert) doit respecter le sprincipes suivants :

* **Stateless** (sans état) : Une API ne doit pas garder d'état => ne stockera pas qui est connecté en ce moment, c'est géré à l'extérieur.
L'API ne savuegarde aucune donnée utilisateur. Si besoin d'identifier qui fait la requête, cette info devra être transmise dans la requête, soit dana la query, soit dans les headers, soit dans les cookies 🍪.

* **Interface Uniforme** : = comment l'interface est représentée. L'API doit utiliser des modèles de données uniformes et cohérents (le lastname s'écrit toujours comme ça, pas une fois lastname et une fois lastName), en entrée et en sortie, et utiliser des méthodes, ou Verb, standards (GET, POST...). Conseillé de toujours écrire en anglais.

* **Ressources** : les données sont vues comme des ressources (user, task...) et les url doivent être parlantes/claires.
ex : http://localhost:3000/api/42/tasks = toutes les tâches de l'utilisateur 42.
ex : http://localhost:3000/api/tasks/next = toutes les tâches de tous les utilisateurs, mais seulement les nouvelles pas encore faites.
ex : http://localhost:3000/api/tasks?category=2&category=3. = les tâches qui correspondent aux catégories 2 et 3. Ici, la catégorie n'est pas la ressource recherchée (même si elle est indiquée après tasks), c'est bien la tâche liée à cette catégorie qu'on veut.
=> L'url doit clairement indiquer ce qu'on cherche.

* **Couche & cache** : L'API devrait idéalement être séparée en plusieurs couches logiques (architecture). 
= Partie Couche.
Les requêtes devraient idéalement être mises en Cache (souvent à moitié respecté, et pas obligatoire notamment quand on fait des tests), pour éviter d'interroger l'API pour rien.


## Initialiser un projet Node
### Télécharger Node hihi no shit
http://nodejs.org/fr pour avoir accès à Node et à son gestionnaire de package npm.

### Intialiser un dossier comme étant un projet Node :
```
npm init
```
Tout un tas de questions nous son tposées pour config le prijet. Appyuer su rEnter pour valider la valeur par défaut renseignée entre (). Le seul truc à modifier c'est éventiuellement le nom de ficher de point d'entrée (index.js -> app.js).

> Un fichier app.js est alors créé, il contient les commandes pour lancer le projet, les tests... dans un objet appelé **scripts** mais aussi les dépendances du projet qui se trouveront (pas tout de site mais plus tard) dans un objet appelé **dependencies**. Les dépendances sont une liste de librairies js dont notre projet a besoin pour fonctionner.

> [!Warning]
> 📢Attention, il faudra penser à avoir un gitignore en règles à partir de ce moment-là, car les dépendances peuvent peser très lo!urd, donc hors de quetsoin de mettre ça sur git. Soit on le fait à la main (chiant et risqué si on oublie des trucs), soit télécharger un extenson sur VSC "gitignore" qui permet de créer un fichier gitignore en rapport avec un type de projet en particulier. Grâce à cette extension, vous pourrez :
> * appuyer sur f1 ou ctrl + maj + p pour ouvrir la barre des tâches 
> * Sélect Add gitignore
> * Une nouvelle barre de rcehcre apparaît -> commencer à taper Node -> Sélectionner Node dans la liste proposée
> -> 🎆 BIM notre gitignore s'est rajouté tout seul dans notre projet !

### Créer le fichier app.js
Créer un fichier à la racine du projet appelé app.js (ou index;js si on a laissé le nom par défaut).
Rajouter un script pour lancer le fichier app.js :
```json
    "scripts" : {
        "start" : "node app.js"
    }
```


## Installer Express dans le projet :
[Express] (https://expressjs.com/) est juste une librairie JS qui permet de créer des web app et des API plus facilement qu'en NodeJS pur.

Pour l'installer, taper dans la console :
```
npm i express
```
ou

```
npm install express
```

-> Express est maintenant installé dans le projet. Un fichier package-lock.json a été créé(sais po à quoi ça sert), et dans le fichier package.json de base, des dépendances ont été ajoutées, dans lesquelles on voit express !

## Bonus : Récupérer un projet Node/Express :
Quand on va récup un projet Node (Express, React, Angular...), il faudra refaire un node_modules avec toutes les dépendances du projet, en tapant dans la console :
```
npm i
```

## Création d'un serveur Web avec Express :

Nous allons utiliser la librairie Express pour créer notre serveur. Pour ce faire, écrire dans app.js :
```
Voir dans le fichier app.js.
```

## Restart du serveur en cas de modification :
Le point chiant de notre serveur actuel, c'est qu'à chaque modif il faut le couper avec **ctrl + c** et le relancer avec npm start.
💡Mais il existe des solutions pour que le serveur se relance tout seul comme un grand à chaque sauvegarde :

### Méthode 1 : Nodemon (long et chiant, c'était pas mieux avant)
Avant, il fallait télécharger une librairie appelée Nodemon.
[Nodemon] est une librairie js qui permet de refresh et restart le server à chaqu esauvegarde.
Pour l'installer, il fallait :
```
npm i -D nodemon
```
-D est présent pour l'installe dans les dépendances de dev uniquement.

Il fallait ensuite rajouter le fichier package.json un nouveau script :
```json
    "scripts" : {
        "start" : "node app.js",
        "dev" : "nodemon app.js"
    }
```

### Méthode 2 : Watch natif de Node depuis la version 18+
Il suffit de rajouter un nouveau script dans package.json :
```json
    "scripts" : {
        "start" : "node app.js",
        "dev" : "node --watch app.js"
    }
```
Pour lancer le serveur en mode dev, il faudra taper cette fois dans la console :
```
npm run dev
```

## Lrs variables d'envorpnnement :
Ce sont des variables stockées sur notre machine. On y stocke des onfos de connection, ou propres à la mahcine...
On évite de les partager.

elles sont accessibles en JS dans un objet process via sa propriété process.env :
```js
console.log(process.env);
```
Pour créer de nouvelles variables d'environnement, on crée un fichier appelé .env dans lequel on va mettre nos variables d'environnement. Ces infos étant très osuvent confidentielles, ce type de fichier est ignoré par notre .gitignore (on voit qu'il est grisé sur VSC).\
Comme il ne sera jamais mis sur Git, pour que les autres personnes sachent quelles veriables mettre en place chez eux et avec quel nom (mais sans les valeurs associées), on fait souvent un fichier **.env.example**, qui lui n'est pas grisé, donc pas ignoré.

Mais pour le moment, la variable d'environnement PORT=3000 n'est toujours pas dans la machine, on l'a juste écrit.
Pour mettr eles variables d'environnement présentes dans le fichier .env dans les variables de la machine, deux solutions :
* 🦕Version dinosaure : Via la librairie [doten]
* 🕺Version jeune et cool : Via une nouvelle fonctionnalité native de Node, donc directement dans nos scripts dans le package.json :
```json
    "scripts": {
        "start": "node --env-file=.env app.js",
        "dev" : "node --watch --env-file=.env app.js",
    }, // Donc ajouter --env-file=.env au milieu du reste.
```
