const express = require('express');
const router = express.Router();

const detailController = require("../controllers/detailController.js");

router.get("/",detailController.index);

module.exports = router;

