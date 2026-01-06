const categoryRouter = require('express').Router();

categoryRouter.get('/', (req, res) => {
    res.send("Voici toutes les catégories", 200)
})

categoryRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    res.send(`Voici la catégorie numéro ${req.params.id}`, 200)
})

categoryRouter.post('/', (req, res) => {
    const categoryToInsert = req.body;
    res.send(categoryToInsert, 201);
    console.log(categoryToInsert);

    // Avant c'était :
    //res.send(`La catégorie numéro ${3} a bien été ajoutée !`, 200)
})

categoryRouter.put('/:id', (req, res) =>{
    const categoryId = req.params.id;
    const categoryUpdated = req.body;
    categoryUpdated.id = categoryId;

    res.send(categoryUpdated, 200);
})

categoryRouter.delete('/:id', (req, res) => {
    res.sendStatus(204);
})

module.exports = categoryRouter;