import { Sequelize } from "sequelize";
import db from "../database/Database.js";
import PackageModel from "./packageModel.js";
import PaymentMethodModel from "./paymentMethodModel.js";

const { DataTypes } = Sequelize;

const InvoiceModel = db.define("factura", {
  id_factura: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_paquete: {
    type: DataTypes.INTEGER,
    autoIncrement: false,
    primaryKey: true,
  },
  id_metodo_de_pago: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  cantidad_pagada: {
    type: DataTypes.STRING,
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
PackageModel.hasOne(InvoiceModel, { foreignKey: "id_paquete" });
InvoiceModel.belongsTo(PaymentMethodModel, { foreignKey: "id_metodo_de_pago" });

export default InvoiceModel;
