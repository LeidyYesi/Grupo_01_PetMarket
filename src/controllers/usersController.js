const path = require('path');

let userController = {
    login: function(req,res) {
        res.render("users/login.ejs");
    },
    register: function(req,res) {
        res.render("users/register.ejs");
    }
}



module.exports = userController;