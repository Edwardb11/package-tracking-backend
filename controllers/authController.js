const bcryptjs = require("bcryptjs");
const conexion = require("../database/db");

//procedimiento para registrarnos
exports.register = async (req, res) => {
  try {
    const name = req.body.name;
    const user = req.body.user;
    const pas = req.body.pas;
    // let passHash = await bcryptjs.hash(pas, 8);
    //console.log(passHash)
    conexion.query(
      "INSERT INTO users SET ?",
      { user: user, name: name, pas: pas },
      (error, results) => {
        if (error) {
          console.log(error);
        }
        console.log("FUnciono");
      }
    );
  } catch (error) {
    console.log(error);
  }
};
