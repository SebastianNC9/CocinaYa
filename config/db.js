// config/db.js
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.MYSQL_ADDON_HOST,     
    user: process.env.MYSQL_ADDON_USER,    
    password: process.env.MYSQL_ADDON_PASSWORD, 
    database: process.env.MYSQL_ADDON_DB,
    port: process.env.MYSQL_ADDON_PORT
});

connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión a MySQL establecida');
});

module.exports = connection;
