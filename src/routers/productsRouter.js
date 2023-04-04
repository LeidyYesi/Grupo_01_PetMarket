// ************ Require's ************
const express = require('express');
const router = express.Router();
const adminAccess = require("../middlewares/adminAccess")
const createValidation = require('../middlewares/validateCreateProducts');


// ************ Controller Require ************
const productsController = require('../controllers/productsController');

// ************ Multer ************
const uploadFile = require('../middlewares/multerMiddleware');

// Devolver todos los productos de un determinado pet o categoria
router.get('/list/:filtro/', productsController.index);

//Devolver todos los productos por descripcion
router.get('/search/', productsController.search);

// Crear un producto
router.get('/create/', adminAccess, productsController.create);
router.post('/create/', uploadFile.single('img'), createValidation, productsController.processCreate);

// Devolver un producto
router.get('/detail/:id/', productsController.detail);

// Editar un producto
router.get('/edit/:id', adminAccess, productsController.edit);
router.put('/edit/:id', uploadFile.single('img'), productsController.processEdit);

// Eliminar un producto
router.delete('/delete/:id', adminAccess, productsController.destroy);

// Adicionar productos al carrito de compras
router.get("/cart",productsController.cart);

module.exports = router;