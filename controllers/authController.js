const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const conexion = require("../database/db");

//procedimiento para registrarnos
exports.register = async (req, res) => {
  try {
    const name = req.body.name;
    const user = req.body.user;
    const pas = req.body.pas;
    let passHash = await bcryptjs.hash(pas, 8);
    // console.log(passHash)
    conexion.query(
      "INSERT INTO users SET ?",
      { user: user, name: name, pas: passHash },
      (error, results) => {
        if (error) {
          console.log(error);
        }
        console.log(user, name, pas);
        console.log("Funciono");
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  try {
    const user = req.body.user;
    const pas = req.body.pas;

    if (!user || !pas) {
      return { errors: true };
    } else {
      conexion.query(
        `SELECT * FROM users WHERE user = ?`,
        [user],
        async (error, results) => {
          if (
            results.length == 0 ||
            !(await bcryptjs.compare(pas, results[0].pas))
          ) {
            return { errors: true };
          } else {
            //inicio de sesión OK
            const id = results[0].id;
            const token = jwt.sign({ id: id }, process.env.JWT_SECRETO, {
              expiresIn: process.env.JWT_TIEMPO_EXPIRA,
            });
            //generamos el token SIN fecha de expiracion
            //const token = jwt.sign({id: id}, process.env.JWT_SECRETO)
            console.log("TOKEN: " + token + " para el USUARIO : " + user);

            const cookiesOptions = {
              expires: new Date(
                Date.now() +
                  process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
              ),
              httpOnly: true,
            };
            res.cookie("jwt", token, cookiesOptions);
            return { login: true };
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
};
