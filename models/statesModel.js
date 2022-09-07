import { Sequelize } from "sequelize";
import db from "../database/Database.js";

const { DataTypes } = Sequelize;

const StateModel = db.define("estados", {
  id_estado: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
  },
});

export default StateModel;
