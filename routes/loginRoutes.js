// routes/loginRoutes.js
const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// Definir el endpoint para iniciar sesión (método POST)
router.post('/', loginController.login);

module.exports = router;
