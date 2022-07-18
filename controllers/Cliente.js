import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Cliente from "../models/ClienteModel.js";

export const Register = async (req, res) => {
  const {
    correo_electronico,
    contrasena,
    nombres,
    apellidos,
    sexo,
    celular,
    fecha_nacimiento,
  } = req.body;
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(contrasena, salt);
  try {
    await Cliente.create({
      correo_electronico: correo_electronico,
      contrasena: hashPassword,
      nombres: nombres,
      apellidos: apellidos,
      sexo: sexo,
      celular: celular,
      fecha_nacimiento: fecha_nacimiento,
    });
    res.json({ msg: "Registrado exitoxamente", login: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Algo anda mal", login: false });
  }
};

export const Login = async (req, res) => {
  try {
    const user = await Cliente.findAll({
      where: {
        email: req.body.email,
      },
    });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match)
      return res
        .status(400)
        .json({ msg: "Contraseña no coinciden", login: false });
    const userId = user[0].id;
    const name = user[0].name;
    const email = user[0].email;
    const accessToken = jwt.sign(
      { userId, name, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20s",
      }
    );
    const refreshToken = jwt.sign(
      { userId, name, email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    await Cliente.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken, login: true, msg: "Datos correctos", id: userId });
  } catch (error) {
    res
      .status(404)
      .json({ msg: "El correo electrónico no encontrado", login: false });
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await Cliente.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(204);
  const userId = user[0].id;
  await Cliente.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};
