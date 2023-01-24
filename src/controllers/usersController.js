const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const model = require('../models/jsonTableFunctions');
const user = model('users');


let userController = {
    login: function(req,res) {
        res.render("users/login.ejs");
    },
    register: function(req,res) {
        res.render("users/register.ejs");
    },
    processRegister: function(req,res) {
        const resultValidation  = validationResult(req)

        if (resultValidation.errors.length > 0) {
			return res.render('users/register.ejs', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}

        let userInDB = user.findByField('email', req.body.email);

		if (userInDB) {
			return res.render('users/register.ejs', {
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
			avatar: req.file.filename
		}

		let userCreated = user.create(userToCreate);

		return res.redirect('/users/login');
    }
}



module.exports = userController;