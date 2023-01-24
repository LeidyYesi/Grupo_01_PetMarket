const path = require('path');
const { body } = require('express-validator');

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

module.exports = validations;
