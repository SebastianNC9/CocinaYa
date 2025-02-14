// controllers/loginController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../config/db');

exports.login = (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: "El email y la contraseña son requeridos" });
  }
  
  const query = "SELECT * FROM cuenta WHERE email = ?";
  connection.query(query, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(401).json({ error: "Credenciales inválidas" });
    
    const user = results[0];
    try {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        // Generar el token JWT
        const token = jwt.sign(
          {
            id: user.ID_cuenta,
            email: user.email,
            nombre_usuario: user.nombre_usuario
          },
          process.env.JWT_SECRET,
          { expiresIn: '1h' } // El token expirará en 1 hora (ajusta según tus necesidades)
        );
        return res.json({
          message: "Inicio de sesión exitoso",
          token,
          user: {
            id: user.ID_cuenta,
            nombre_usuario: user.nombre_usuario,
            email: user.email
          }
        });
      } else {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });
};
