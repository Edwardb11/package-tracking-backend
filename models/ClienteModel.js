import { Sequelize } from "sequelize";
import db from "../database/Database.js";

const { DataTypes } = Sequelize;

const Cliente = db.define("clientes", {
  id_clientes: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  correo_electronico: {
    type: DataTypes.STRING,
  },
  contrasena: {
    type: DataTypes.STRING,
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
  celular: {
    type: DataTypes.STRING,
  },
  fecha_nacimiento: {
    type: DataTypes.DATE,
  },
  refresh_token: {
    type: DataTypes.TEXT,
  },
});

export default Cliente;
