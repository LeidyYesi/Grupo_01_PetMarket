const path = require('path');

let detalleController = {
    index: function(req,res) {
        let home = path.resolve(__dirname,'../views/products/productDetail.ejs');
        res.render(home);
    }
}

module.exports = detalleController;