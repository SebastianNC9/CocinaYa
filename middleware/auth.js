// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Buscar el token en el encabezado "Authorization" (formato: Bearer <token>)
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'No se proporcionó token' });
  }
  
  const tokenParts = authHeader.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Token mal formado' });
  }
  
  const token = tokenParts[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Guarda los datos del token en req.user
    next(); // Continúa al siguiente middleware o ruta
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};
