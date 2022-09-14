import { Sequelize } from "sequelize";

const db = new Sequelize("sistema_paqueteriaV2", "root", "", {
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: false,
    freezeTableName: true,
  },
});

export default db;
