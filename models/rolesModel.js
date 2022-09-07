import { Sequelize } from "sequelize";
import db from "../database/Database.js";

const { DataTypes } = Sequelize;

const RolesModel = db.define("roles", {
  id_roles: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
  },
});

export default RolesModel;
