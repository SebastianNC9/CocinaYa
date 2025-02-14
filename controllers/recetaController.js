// controllers/recetaController.js
const connection = require('../config/db');

// Crear receta
exports.createReceta = (req, res) => {
    // Extraer cuenta_id del usuario autenticado
    const cuenta_id = req.user.id;
    
    // Extraer los demás campos del body
    const { titulo, ingredientes, pasos, imagen } = req.body;
    
    // Validar los campos obligatorios
    if (!titulo || !ingredientes || !pasos) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
    
    const query = 'INSERT INTO receta (cuenta_id, titulo, ingredientes, pasos, imagen) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [cuenta_id, titulo, ingredientes, pasos, imagen], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: "Receta creada correctamente", id: result.insertId });
    });
  };

// Obtener todas las recetas
exports.getAllRecetas = (req, res) => {
  connection.query('SELECT * FROM receta', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

// Obtener una receta por ID
exports.getRecetaById = (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM receta WHERE ID_receta = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Receta no encontrada" });
    }
    res.json(results[0]);
  });
};

// Actualizar una receta (sin la columna descripción)
exports.updateReceta = (req, res) => {
  const { id } = req.params;
  const { titulo, ingredientes, pasos, imagen } = req.body;
  
  const query = 'UPDATE receta SET titulo = ?, ingredientes = ?, pasos = ?, imagen = ? WHERE ID_receta = ?';
  connection.query(query, [titulo, ingredientes, pasos, imagen, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Receta actualizada correctamente" });
  });
};

// Eliminar una receta
exports.deleteReceta = (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM receta WHERE ID_receta = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Receta eliminada correctamente" });
  });
};

// Endpoint para explorar recetas (opcional: excluye las propias si se envía userId como query)
exports.getExplorarRecetas = (req, res) => {
    // Obtener el userId del query string
    const userId = req.query.userId;
    let query = 'SELECT * FROM receta';
    let params = [];
  
    // Si se proporciona userId, excluimos las recetas de ese usuario
    if (userId) {
      query += ' WHERE cuenta_id != ?';
      params.push(userId);
    }
  
    connection.query(query, params, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  };
  
// Endpoint para obtener las recetas del usuario (mis recetas)
exports.getMisRecetas = (req, res) => {
  const { userId } = req.params;
  const query = 'SELECT * FROM receta WHERE cuenta_id = ?';
  connection.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
