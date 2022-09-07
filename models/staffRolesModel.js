import { Sequelize } from "sequelize";
import db from "../database/Database.js";

const StaffRolesModel = db.define("personal_roles", {
    creado:{
        type: DataTypes.TIME,
        allowNull:true
      },
      actualizado:{
        type: DataTypes.TIME,
        allowNull:true
      }
});



export default StaffRolesModel;
