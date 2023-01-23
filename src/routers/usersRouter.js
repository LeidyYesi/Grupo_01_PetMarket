const express = require('express');
const router = express.Router();

const path = require('path');
const multer = require('multer');

const { body } = require('express-validator');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './public/img/avatars');
	},
	filename: (req, file, cb) => {
        console.log(file);
		let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
		cb(null, fileName);
	}
})

const uploadFile = multer({ storage });


const usersController = require("../controllers/usersController.js");

const validations = [
	body('nombre').notEmpty().withMessage('Tienes que ingresar un nombre'),
	body('apellido').notEmpty().withMessage('Tienes que ingresar un apellido'),
    body('email')
		.notEmpty().withMessage('Tienes que ingresar un correo electrónico').bail()
		.isEmail().withMessage('Debes escribir un formato de correo válido'),
	body('password').notEmpty().withMessage('Tienes que ingresar una contraseña'),
    body('category').notEmpty().withMessage('Tienes que elegir una categoria'),
	body('avatar').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif'];
		
		if (!file) {
			throw new Error('Tienes que subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}

		return true;
	})
]

router.get("/login",usersController.login);
router.get("/register",usersController.register);
router.post("/register",uploadFile.single('avatar'),validations, usersController.processRegister);

module.exports = router;