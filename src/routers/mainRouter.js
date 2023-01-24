// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require("../controllers/mainController.js");

//Devolver todos los productos que estan en promocion de manera dinamica.
router.get("/",mainController.index);

module.exports = router;

