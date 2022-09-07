import { Sequelize } from "sequelize";
import db from "../database/Database.js";
import PackageModel from "./packageModel.js";

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
// PackageModel.belongsToMany(StateModel, { through: 'PackagesStatesModel' });

export default StateModel;
