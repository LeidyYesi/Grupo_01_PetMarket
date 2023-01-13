const path = require('path');
let product = require("../product.js");

let reportController = {
    index: function(req,res) {
        res.render("report.ejs",{product:product});
    }
}

module.exports = reportController;