// routes/comentarioRoutes.js
const express = require('express');
const router = express.Router();
const comentarioController = require('../controllers/comentarioController');

// Agregar un comentario
router.post('/', comentarioController.createComentario);

// Obtener comentarios de una receta (pasar receta_id como parámetro)
router.get('/:receta_id', comentarioController.getComentariosByReceta);


module.exports = router;
