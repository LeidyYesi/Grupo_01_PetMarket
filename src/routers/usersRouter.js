const express = require('express');
const router = express.Router();

// Controller
const usersController = require("../controllers/usersController.js");

// Middlewares
const uploadFile = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');
const logMiddelware = require("../middlewares/logMiddleware")
const authLogMiddelware = require("../middlewares/authLogMiddleware")

// Formulario de registro
router.get("/register", logMiddelware ,usersController.register);


// Procesar el registro
router.post("/register",uploadFile.single('imagen'),validations, usersController.processRegister);

// Formulario de login
router.get("/login", logMiddelware, usersController.login);

// Proceso de Login
router.post("/login",usersController.processLogin);

//Perfil de Usuario
router.get("/userProfile", authLogMiddelware, usersController.profile);

//Cerrar sesion
router.get("/logout", usersController.logout);
module.exports = router;