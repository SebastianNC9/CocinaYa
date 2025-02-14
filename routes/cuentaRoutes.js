// routes/cuentaRoutes.js
const express = require('express');
const router = express.Router();
const cuentaController = require('../controllers/cuentaController');

// Ruta para crear una cuenta (registro)
router.post('/', cuentaController.createCuenta);

module.exports = router;
