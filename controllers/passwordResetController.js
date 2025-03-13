// controllers/passwordResetController.js
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const connection = require('../config/db');
const sendResetEmail = require('../services/emailService');

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "El email es requerido" });
    }

    try {
        // Generar un token aleatorio
        const resetToken = crypto.randomBytes(20).toString('hex');

        // Guardar el token en la base de datos con un tiempo de expiración
        const query = "UPDATE cuenta SET reset_token = ? WHERE email = ?";
        connection.query(query, [resetToken, email], (err, result) => {
            if (err) return res.status(500).json({ error: "Error en la base de datos" });

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "No se encontró una cuenta con ese email" });
            }

            // Enviar el correo con el token
            sendResetEmail(email, resetToken);

            res.json({ message: "Correo de recuperación enviado" });
        });
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ error: "Token y nueva contraseña son requeridos" });
  }

  connection.query("SELECT * FROM cuenta WHERE reset_token = ?", [token], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(400).json({ error: "Token inválido o expirado" });

    const user = results[0];
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    connection.query("UPDATE cuenta SET password = ?, reset_token = NULL WHERE reset_token = ?", [hashedPassword, token], (err) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json({ message: "Contraseña actualizada correctamente" });
    });
  });
};

