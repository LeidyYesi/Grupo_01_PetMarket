const path = require('path');

let registerController = {
    index: function(req,res) {
        let home = path.resolve(__dirname,'../views/register.ejs');
        res.render(home);
    }
}

module.exports = registerController;