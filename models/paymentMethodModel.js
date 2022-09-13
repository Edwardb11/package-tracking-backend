import { Sequelize } from "sequelize";
import db from "../database/Database.js";

const { DataTypes } = Sequelize;

const PaymentMethodModel = db.define("metodos_de_pago", {
  id_metodo_de_pago: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
  },
});

export default PaymentMethodModel;
