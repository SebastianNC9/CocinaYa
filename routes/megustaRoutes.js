// routes/meGustaRoutes.js
const express = require('express');
const router = express.Router();
const meGustaController = require('../controllers/megustaController');

// Agregar un like
router.post('/', meGustaController.addLike);

// Quitar un like
router.delete('/', meGustaController.removeLike);

// Obtener recetas favoritas de un usuario (pasar userId como parámetro)
router.get('/:userId', meGustaController.getFavoritos);

module.exports = router;
