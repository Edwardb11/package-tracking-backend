import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ClientModel from "../models/clientModel.js";

export const Register = async (req, res) => {
  const { email, password, name, lastName, sex, phone, birthDate } = req.body;
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await ClientModel.create({
      correo_electronico: email,
      contraseña: hashPassword,
      nombres: name,
      apellidos: lastName,
      sexo: sex,
      celular: phone,
      fecha_nacimiento: birthDate,
    });
    res.json({ msg: "Registrado exitoxamente" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Solicitud incorrecta" });
  }
};

export const Login = async (req, res) => {
  console.log(req.body);
  try {
    const cliente = await ClientModel.findAll({
      where: {
        correo_electronico: req.body.email,
      },
    });
    const match = await bcrypt.compare(
      req.body.password,
      cliente[0].contraseña
    );
    if (!match)
      return res.status(400).json({ msg: "La contraseña no coincide" });
    const clienteId = cliente[0].id_cliente;
    const name = cliente[0].nombres;
    const email = cliente[0].correo_electronico;
    const sex = cliente[0].sexo;

    const accessToken = jwt.sign(
      { clienteId, name, email, sex },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20s",
      }
    );
    const refreshToken = jwt.sign(
      { clienteId, name, email, sex },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );
    await ClientModel.update(
      { token: refreshToken },
      {
        where: {
          id_cliente: clienteId,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({
      accessToken,
      login: true,
      msg: "Datos correctos",
      id: clienteId,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "El correo electrónico no encontrado" });
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const cliente = await ClientModel.findAll({
    where: {
      token: refreshToken,
    },
  });
  if (!cliente[0]) return res.sendStatus(204);
  const clienteId = cliente[0].id_cliente;
  await ClientModel.update(
    { token: null },
    {
      where: {
        id_cliente: clienteId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};
