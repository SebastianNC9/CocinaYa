// controllers/comentarioController.js
const connection = require('../config/db');

exports.createComentario = (req, res) => {
  const { receta_id, cuenta_id, comentario } = req.body;
  if (!receta_id || !cuenta_id || !comentario) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }
  const query = 'INSERT INTO comentario (receta_id, cuenta_id, comentario) VALUES (?, ?, ?)';
  connection.query(query, [receta_id, cuenta_id, comentario], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Comentario agregado correctamente", id: result.insertId });
  });
};

exports.getComentariosByReceta = (req, res) => {
  const { receta_id } = req.params;
  const query = 'SELECT * FROM comentario WHERE receta_id = ?';
  connection.query(query, [receta_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};