// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");

// ************ Controller Require ************
const productsController = require('../controllers/productsController.js');

// ************ Multer ************
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/img/products")
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

// Devolver todos los productos  
router.get('/', productsController.index); 

// Crear un producto
router.get('/create/', productsController.create);
// router.post('/create/', productsController.processCreate);


// Devolver un producto 
router.get('/detail/:id/', productsController.detail);


// Editar un producto
router.get('/edit/:id', productsController.edit);
// router.put('/edit/:id', upload.single("editedProductImage"), productsController.processEdit);

// Eliminar un producto
// router.delete('/delete/:id', productsController.destroy);

router.get("/cart",productsController.cart);

module.exports = router;