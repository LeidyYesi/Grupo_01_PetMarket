const path = require('path');

let registerController = {
    index: function(req,res) {
        res.render("users/register.ejs");
    }
}

module.exports = registerController;