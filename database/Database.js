import { Sequelize } from "sequelize";

const db = new Sequelize("sistema_de_paqueteria", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
