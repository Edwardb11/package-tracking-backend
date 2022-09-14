import { Sequelize } from "sequelize";
import db from "../database/Database.js";
import PackageModel from "./packageModel.js";

const { DataTypes } = Sequelize;

const InvoiceModel = db.define("factura", {
  id_factura: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_paquete: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  cantidad_a_pagar: {
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

InvoiceModel.belongsTo(PackageModel, { foreignKey: "id_paquete" });
PackageModel.hasMany(InvoiceModel, { foreignKey: "id_paquete" });

export default InvoiceModel;
