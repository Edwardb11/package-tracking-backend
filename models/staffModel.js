import { Sequelize } from "sequelize";
import db from "../database/Database.js";

const { DataTypes } = Sequelize;

const StaffModel = db.define("personal", {
  id_personal: {
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
  niveles_estudios: {
    type: DataTypes.STRING,
  },
  token: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  fecha_nacimiento: {
    type: DataTypes.DATE,
  },
  celular: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  activo: {
    type: DataTypes.BOOLEAN,
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

export default StaffModel;
