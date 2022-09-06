import { Sequelize } from "sequelize";
import db from "../database/Database.js";

const { DataTypes } = Sequelize;

const EndUsersModel = db.define('usuario_finales', {
  id_usuario_final: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombres: {
    type: DataTypes.STRING,
  },
  apellidos: {
    type: DataTypes.STRING,
  },
  sexo: {
    type: DataTypes.STRING,
  },
  ubicacion: {
    type: DataTypes.STRING,
  },
  celular: {
    type: DataTypes.STRING,
  },
});
export default EndUsersModel;
