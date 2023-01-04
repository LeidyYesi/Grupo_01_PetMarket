const path = require('path');

let userController = {
    index: function(req,res) {
        let home = path.resolve(__dirname,'../views/users/login.ejs');
        res.render(home);
    },
    register: function(req,res) {
        let home = path.resolve(__dirname,'../views/users/register.ejs');
        res.render(home);
    }
}

module.exports = userController;