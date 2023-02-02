const express = require('express');
const router = express.Router();

// Controller
const usersController = require("../controllers/usersController.js");

// Middlewares
const uploadFile = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');



// Formulario de registro
router.get("/register",usersController.register);


// Procesar el registro
router.post("/register",uploadFile.single('imagen'),validations, usersController.processRegister);

// Formulario de login
router.get("/login",usersController.login);

// Proceso de Login
router.post("/login",usersController.processLogin);

//Perfil de Usuario
router.get("/userProfile",usersController.profile);


module.exports = router;