const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const model = require('../models/jsonTableFunctions');
const moveFile = require('../models/imageDistribution');
const user = model('users');


let userController = {
    login: function(req,res) {
        res.render("users/login");
    },
	processLogin:  (req, res) =>{
		//Buscamos al usuario
		let userToLogin = user.findByField("email",req.body.email);
		if (userToLogin) {
			let passwordOk = bcryptjs.compareSync(req.body.password, userToLogin.password );
			if (passwordOk) {
				return res.redirect("/users/userProfile")
			}
			return res.render("users/login", {
				errors: {
					password: {
						msg: "Contraseña incorrecta"
					}
				}
	
			})
		}
		return res.render("users/login", {
			errors: {
				email: {
					msg: "Su email no esta registrado"
				}
			}

		})
	},

    register: function(req,res) {
        res.render("users/register");
    },
    processRegister: function(req,res) {
		const resultValidation  = validationResult(req)

        if (resultValidation.errors.length > 0) {
			return res.render('users/register', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}

        let userInDB = user.findByField('email', req.body.email);

		if (userInDB) {
			return res.render('users/register', {
				errors: {
					email: {
						msg: 'Este email ya está registrado'
					}
				},
				oldData: req.body
			});
		}

		let userToCreate = {
			...req.body,
			password: bcryptjs.hashSync(req.body.password, 10),
			imagen: req.file.filename
		}

		let userCreated = user.create(userToCreate);

		// mover la imagen de temp al repositorio de img de usuario
		let destinationPath = './public/img/users'
		moveFile(req.file.filename, req.file.destination,destinationPath);

		return res.redirect('/users/login');
    },
	profile: function(req,res) {
        res.render("users/userProfile");
    },

}



module.exports = userController;