const path = require('path');

let cartController = {
    index: function(req,res) {
        let home = path.resolve(__dirname,'../views/productCart.ejs');
        res.render(home);
    }
}

module.exports = cartController;