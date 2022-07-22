import { Sequelize } from "sequelize";

const db = new Sequelize("sistema_de_paqueteria", "root", "", {
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: false,
  },
});

export default db;
