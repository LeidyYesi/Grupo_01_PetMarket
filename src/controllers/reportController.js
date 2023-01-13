const path = require('path');
let product = require("../product.js");

let reportController = {
    index: function(req,res) {
        console.log("direname "+__dirname);
        let home = path.resolve(__dirname,'../views/report.ejs');
        res.render(home,{product:product});
    }
}

module.exports = reportController;