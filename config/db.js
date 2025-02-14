// config/db.js
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,     // e.g. 'localhost'
    user: process.env.DB_USER,     // e.g. 'root'
    password: process.env.DB_PASS, // si no tienes contraseña, queda vacío
    database: process.env.DB_NAME  // e.g. 'nombre_de_tu_basedatos'
});

connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión a MySQL establecida');
});

module.exports = connection;
