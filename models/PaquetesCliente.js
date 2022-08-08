import { Sequelize } from "sequelize";
import db from "../database/Database.js";
const { DataTypes } = Sequelize;

const PaquetesClientes = db.define("paquetes_clientes", {
  id_paquetes_clientes: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_paquetes: {
    type: DataTypes.INTEGER,
  },
  id_clientes: {
    type: DataTypes.INTEGER,
  },
});

export default PaquetesClientes