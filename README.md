# CocinaYa

# Descripción del Proyecto
Esta API está desarrollada con Node.js y Express. La arquitectura se basa en rutas (routes) y controladores (controllers), donde toda la lógica está centralizada en los controladores.

# Estructura del Código
- server.js: Archivo principal que configura Express y define los endpoints.
- routes/: Contiene las rutas de la API, que llaman a los controladores.
- controllers/: Manejan la lógica de negocio y responden a las solicitudes.

# Diagrama UML
El siguiente diagrama representa la relación entre los componentes principales:
- Server inicializa la API y dirige las solicitudes a Router.
- Router define las rutas y las asocia con los Controllers.
- Controllers contienen toda la lógica de la API y responden a las solicitudes.
- Database donde Controllers se comunica directamente con la base de datos.

![imagen](https://github.com/user-attachments/assets/b12c48cd-9411-4b7a-b61d-f75d13e7500d)


# Base de Datos
Esta API utiliza MySQL en XAMPP como base de datos. La conexión se establece mediante el paquete mysql2 en Node.js.
La base de datos esta en el archivo receta_db.sql.

Se usa Postman para probar los endpoints y verificar su funcionamiento.
