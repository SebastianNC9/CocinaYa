const express = require('express');
const router = express.Router();
const recetaController = require('../controllers/recetaController');
const authMiddleware = require('../middleware/auth');

// Crear receta (requiere autenticación)
router.post('/', authMiddleware, recetaController.createReceta);

// Listar todas las recetas (público)
router.get('/', recetaController.getAllRecetas);

// Recetas para explorar (público, pero puedes filtrar en el controlador)
router.get('/explorar', recetaController.getExplorarRecetas);

// Mis recetas (público, pero usualmente se filtra por el usuario autenticado)
router.get('/mis-recetas/:userId', recetaController.getMisRecetas);

// Rutas dinámicas
router.get('/:id', recetaController.getRecetaById);
router.put('/:id', authMiddleware, recetaController.updateReceta);
router.delete('/:id', authMiddleware, recetaController.deleteReceta);

module.exports = router;
