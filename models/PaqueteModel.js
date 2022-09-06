import { Sequelize } from "sequelize";
import db from "../database/Database.js";
import clientModel from "./clientModel.js";
import TipoPaquetes from "./TipoPaquetes.js";
import UsuarioFinal from "./UsuarioFinal.js";

const { DataTypes } = Sequelize;

const Paquetes = db.define("paquetes", {
  id_paquetes: {
    type: DataTypes.INTEGER,
    autoIncrement: false,
    primaryKey: true,
  },
  id_clientes: {
    type: DataTypes.INTEGER,
  },
  id_usuario_final: {
    type: DataTypes.INTEGER,
  },
  tipo_paquete: {
    type: DataTypes.INTEGER,
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
});

clientModel.hasMany(Paquetes, { foreignKey: "id_clientes"});
Paquetes.belongsTo(clientModel, { foreignKey: "id_clientes" });
Paquetes.belongsTo(UsuarioFinal, { foreignKey: "id_usuario_final" });
Paquetes.hasMany(TipoPaquetes, {foreignKey:"tipo_paquete"})

export default Paquetes;
