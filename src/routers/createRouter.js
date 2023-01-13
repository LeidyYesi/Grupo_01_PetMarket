const express = require('express');
const router = express.Router();

const createController = require("../controllers/createController.js");

router.get("/",createController.index);

module.exports = router;