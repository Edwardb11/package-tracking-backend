import { Sequelize } from "sequelize";
import db from "../database/Database.js";
import Cliente from "./ClienteModel.js";
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

Cliente.hasMany(Paquetes, { foreignKey: "id_clientes" });
Paquetes.belongsTo(Cliente, { foreignKey: "id_clientes" });
Paquetes.belongsTo(UsuarioFinal, { foreignKey: "id_usuario_final" });
Paquetes.hasMany(TipoPaquetes, { foreignKey: "id_tipo" });
export default Paquetes;
