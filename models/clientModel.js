import { Sequelize } from "sequelize";
import db from "../database/Database.js";

const { DataTypes } = Sequelize;

const ClientModel = db.define("cliente", {
  id_cliente: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  correo_electronico: {
    type: DataTypes.STRING,
  },
  contraseña: {
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
  token: {
    type: DataTypes.TEXT,
  },
  creado: {
    type: DataTypes.TIME,
    allowNull: true,
  },
  actualizado: {
    type: DataTypes.TIME,
    allowNull: true,
  },
});

export default ClientModel;
