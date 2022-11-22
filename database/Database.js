import { Sequelize } from "sequelize";
import {
  MYSQLHOST,
  MYSQLDATABASE,
  MYSQLPASSWORD,
  MYSQLPORT,
  MYSQLUSER,
} from "./config.js";
const db = new Sequelize(MYSQLDATABASE, MYSQLUSER, MYSQLPASSWORD, {
  host: MYSQLHOST,
  dialect: "mysql",
  port: MYSQLPORT,
  define: {
    timestamps: false,
    freezeTableName: true,
  },
});

export default db;
