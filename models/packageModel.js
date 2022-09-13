import { Sequelize } from "sequelize";
import db from "../database/Database.js";
import clientModel from "./clientModel.js";
import EndUsersModel from "./endUsersModel.js";

const { DataTypes } = Sequelize;

const PackageModel = db.define("paquete", {
  id_paquete: {
    type: DataTypes.STRING,
    autoIncrement: false,
    primaryKey: true,
  },
  id_cliente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  id_usuario_final: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
  },
  peso: {
    type: DataTypes.INTEGER,
  },
  costo: {
    type: DataTypes.INTEGER,
  },
  cantidad: {
    type: DataTypes.INTEGER,
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

PackageModel.belongsTo(clientModel, { foreignKey: "id_cliente" });
PackageModel.belongsTo(EndUsersModel, { foreignKey: "id_usuario_final" });

export default PackageModel;
