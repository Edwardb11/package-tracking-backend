import { Sequelize } from "sequelize";
import db from "../database/Database.js";
import Cliente from "./ClienteModel.js";
import TipoPaquetes from "./TipoPaquetes.js";
import UsuarioFinal from "./UserFinal.js";

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
  cantidad: {
    type: DataTypes.INTEGER,
  },
    // Desabilitando 
    createdAt: false,

    // Desabilitando
    updatedAt: false,
});

Cliente.belongsTo(Paquetes, { foreignKey: "id_clientes" });
Paquetes.hasMany(Cliente,{foreignKey:"id_clientes"})
Paquetes.hasMany(TipoPaquetes, { foreignKey: "tipo_paquete" });
Paquetes.hasMany(UsuarioFinal, { foreignKey: "id_usuario_final" });
export default Paquetes;
