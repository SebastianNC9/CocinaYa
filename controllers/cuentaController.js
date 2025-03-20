// controllers/cuentaController.js
const bcrypt = require('bcrypt');
const connection = require('../config/db');

exports.createCuenta = async (req, res) => {
  const { nombre_usuario, email, password, confirmPassword } = req.body;

  // Validar que se reciban todos los campos requeridos
  if (!nombre_usuario || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: "El nombre de usuario, email y ambas contraseñas son requeridos" });
  }

  // Validar que las contraseñas coincidan
  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Las contraseñas no coinciden" });
  }

  // Expresión regular para validar la contraseña (mínimo una mayúscula, una minúscula y un número)
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error: "La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número",
    });
  }

  try {
    // Hashear la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Consulta para insertar la nueva cuenta
    const query = 'INSERT INTO cuenta (nombre_usuario, email, password) VALUES (?, ?, ?)';
    connection.query(query, [nombre_usuario, email, hashedPassword], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({
        message: "Cuenta creada correctamente",
        id: result.insertId
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
