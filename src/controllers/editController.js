const path = require('path');

let editController = {
    index: function(req,res) {
        let edit = path.resolve(__dirname,'../views/products/productEdit.ejs');
        res.render(edit);
    }
}

module.exports = editController;