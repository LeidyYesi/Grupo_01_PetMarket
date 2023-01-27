// ************ Require's ************
const express = require('express');
const router = express.Router();


// ************ Controller Require ************
const productsController = require('../controllers/productsController');

// ************ Multer ************
const uploadFile = require('../middlewares/multerMiddleware');


// Devolver todos los productos
router.get('/list/:pet/', productsController.index);

// Devolver todos los productos por categoria
router.get('/listCategory/:category/', productsController.categoryList);

// Crear un producto
router.get('/create/', productsController.create);
router.post('/create/', uploadFile.single('image'), productsController.processCreate);

// Devolver un producto
router.get('/detail/:id/', productsController.detail);

// Editar un producto
router.get('/edit/:id', productsController.edit);
router.put('/edit/:id', uploadFile.single('image'), productsController.processEdit);

// Eliminar un producto
router.delete('/delete/:id', productsController.destroy);

// Adicionar productos al carrito de compras
router.get("/cart",productsController.cart);

module.exports = router;