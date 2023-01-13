const path = require('path');

let mainController = {
    index: function(req,res) {
        res.render("home.ejs");
    }
}

module.exports = mainController;