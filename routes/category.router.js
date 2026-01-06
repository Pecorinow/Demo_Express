const categoryRouter = require('express').Router();

categoryRouter.get('/', (req, res) => {
    res.send("Voici toutes les catégories", 200)
})

categoryRouter.get('/3', (req, res) => {
    const id = req.params.id;
    res.send("Voici la catégorie numéro 3", 200)
})

categoryRouter.post('/', (req, res) => {
    res.send(`La catégorie numéro ${3} a bien été ajoutée !`, 200)
})

module.exports = categoryRouter;