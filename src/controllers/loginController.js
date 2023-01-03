const path = require('path');

let userController = {
    index: function(req,res) {
        let home = path.resolve(__dirname,'../views/login.ejs');
        res.render(home);
    },
    register: function(req,res) {
        let home = path.resolve(__dirname,'../views/register.ejs');
        res.render(home);
    }
}

module.exports = userController;