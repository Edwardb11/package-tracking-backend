import { Sequelize } from "sequelize";
import db from "../database/Database.js";

const { DataTypes } = Sequelize;

const UsuarioFinal = db.define("usuario_final", {
  id_usuario_final: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombres:{
      type:DataTypes.STRING
  },
  apellidos:{
      type:DataTypes.STRING
  },
  sexo:{
      type:DataTypes.STRING
  },
  ubicación:{
      type:DataTypes.STRING
  },
  celular:{
      type:DataTypes.STRING
  },

})
export default UsuarioFinal;
