const path = require('path');

let createController = {
    index: function(req,res) {
        let create = path.resolve(__dirname,'../views/products/productCreate.ejs');
        res.render(create);
    }
}

module.exports = createController;