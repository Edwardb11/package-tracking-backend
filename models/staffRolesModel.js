import { Sequelize } from "sequelize";
import db from "../database/Database.js";
import RolesModel from "./rolesModel.js";
import StaffModel from "./staffModel.js";

const { DataTypes } = Sequelize;

const StaffRolesModel = db.define("personal_roles", {
  id_personal: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  id_roles: {
    type: DataTypes.INTEGER,
    primaryKey: true,
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

StaffModel.belongsToMany(RolesModel, {
  through: StaffRolesModel,
  foreignKey: "id_personal",
});
RolesModel.belongsToMany(StaffModel, {
  through: StaffRolesModel,
  foreignKey: "id_roles",
});

StaffRolesModel.belongsTo(RolesModel, { foreignKey: "id_roles" });
StaffRolesModel.belongsTo(StaffModel, { foreignKey: "id_personal" });

export default StaffRolesModel;
