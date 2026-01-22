//! Créer un routeur pour la gestion des utilisateurs  :
const userRouter = require('express').Router();

const userController = require('../controllers/user.controller');

userRouter.route('/')
    .get(userController.getAll)


module.exports = userRouter;
