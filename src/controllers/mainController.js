const path = require('path');

let mainController = {
    index: function(req,res) {
        let home = path.resolve(__dirname,'../views/home.ejs');
        res.render(home);
    }
}

module.exports = mainController;