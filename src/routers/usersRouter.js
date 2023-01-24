const express = require('express');
const router = express.Router();

// Controller
const usersController = require("../controllers/usersController.js");

// Middlewares
const uploadFile = require('../middlewares/multerRegisterMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');

// Formulario de login
router.get("/login",usersController.login);

// Formulario de registro
router.get("/register",usersController.register);

// Procesar el registro
router.post("/register",uploadFile.single('imagen'),validations, usersController.processRegister);

module.exports = router;