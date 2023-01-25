// ************ Require's ************
const express = require('express');
const router = express.Router();


// ************ Controller Require ************
const productsController = require('../controllers/productsController');

// ************ Multer ************
const uploadFile = require('../middlewares/multerMiddleware');


// Devolver todos los productos
router.get('/list/:pet/', productsController.index);

// Crear un producto
router.get('/create/', productsController.create);
router.post('/create/', uploadFile.single('image'), productsController.processCreate);
<<<<<<< HEAD
=======

>>>>>>> e2cc3ad185b95da9361926297585d4134eeb6dd9

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