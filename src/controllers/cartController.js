const path = require('path');

let cartController = {
    index: function(req,res) {
        res.render("products/productCart.ejs");
    }
}

module.exports = cartController;