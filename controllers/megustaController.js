// controllers/meGustaController.js
const connection = require('../config/db');

exports.addLike = (req, res) => {
  const { receta_id, cuenta_id } = req.body;
  if (!receta_id || !cuenta_id) {
    return res.status(400).json({ error: "Se requieren receta_id y cuenta_id" });
  }
  const query = 'INSERT INTO me_gusta (receta_id, cuenta_id) VALUES (?, ?)';
  connection.query(query, [receta_id, cuenta_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Like agregado correctamente", id: result.insertId });
  });
};

exports.removeLike = (req, res) => {
  const { receta_id, cuenta_id } = req.body;
  if (!receta_id || !cuenta_id) {
    return res.status(400).json({ error: "Se requieren receta_id y cuenta_id" });
  }
  const query = 'DELETE FROM me_gusta WHERE receta_id = ? AND cuenta_id = ?';
  connection.query(query, [receta_id, cuenta_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Like removido correctamente" });
  });
};

exports.getFavoritos = (req, res) => {
  const { userId } = req.params;
  const query = `
    SELECT r.* 
    FROM me_gusta mg
    JOIN receta r ON mg.receta_id = r.ID_receta
    WHERE mg.cuenta_id = ?
  `;
  connection.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
