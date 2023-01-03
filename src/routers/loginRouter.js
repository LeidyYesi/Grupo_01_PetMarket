const express = require('express');
const router = express.Router();

const loginController = require("../controllers/loginController.js");

router.get("/",loginController.index);

module.exports = router;