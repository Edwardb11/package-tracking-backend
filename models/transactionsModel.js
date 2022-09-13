import { Sequelize } from "sequelize";
import db from "../database/Database.js";
import InvoiceModel from "./invoiceModel.js";
import PackageModel from "./packageModel.js";
import PaymentMethodModel from "./paymentMethodModel.js";

const { DataTypes } = Sequelize;

const TransactionsModel = db.define("transacciones", {
  id_transaccion: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_metodo_de_pago: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  id_factura: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  monto: {
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

TransactionsModel.belongsTo(PaymentMethodModel, {
  foreignKey: "id_metodo_de_pago",
});
PackageModel.hasOne(InvoiceModel, { foreignKey: "id_factura" });

export default TransactionsModel;
