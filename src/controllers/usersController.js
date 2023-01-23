const { validationResult } = require('express-validator');

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
        return res.send('No hay errores');
    }
}



module.exports = userController;