import { Sequelize } from "sequelize";

const db = new Sequelize("tracking", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
