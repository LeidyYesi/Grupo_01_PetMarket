const path = require('path');

let registerController = {
    index: function(req,res) {
        let home = path.resolve(__dirname,'../views/users/register.ejs');
        res.render(home);
    }
}

module.exports = registerController;