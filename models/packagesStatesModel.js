import { Sequelize } from "sequelize";
import db from "../database/Database.js";
import PackageModel from "./packageModel.js";
import StaffModel from "./staffModel.js";
import StateModel from "./statesModel.js";
const { DataTypes } = Sequelize;

const PackagesStatesModel = db.define("paquetes_estados", {
  id_paquetes: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  id_estado: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  id_personal: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
});

StateModel.belongsToMany(PackageModel, {
  through: PackagesStatesModel,
  foreignKey: "id_estado",
});
PackageModel.belongsToMany(StateModel, {
  through: PackagesStatesModel,
  foreignKey: "id_paquetes",
});
PackagesStatesModel.belongsTo(StaffModel, { foreignKey: "id_personal" });
PackagesStatesModel.belongsTo(StateModel, { foreignKey: "id_estado" });
PackagesStatesModel.belongsTo(PackageModel, { foreignKey: "id_paquetes" });

export default PackagesStatesModel;
