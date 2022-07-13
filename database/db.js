const mysql = require("mysql");

const conexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tracking",
}); 

conexion.connect((error) => {
  if (error) {
    console.log("El error de conexión es: " + error);
    return;
  }
  console.log(`¡Conectado a la base de datos MySQL! `);
});

module.exports = conexion;
