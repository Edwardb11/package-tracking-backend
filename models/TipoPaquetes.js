import { Sequelize } from "sequelize";
import db from "../database/Database.js";

const { DataTypes } = Sequelize;

const TipoPaquetes = db.define("tipo_paquete", {
  id_tipo: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
  },
});
export default TipoPaquetes;
