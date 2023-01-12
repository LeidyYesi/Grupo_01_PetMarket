const express = require('express');
const router = express.Router();

const editController = require("../controllers/editController.js");

router.get("/",editController.index);

module.exports = router;