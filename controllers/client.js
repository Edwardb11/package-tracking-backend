import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ClientModel from "../models/clientModel.js";

export const Register = async (req, res) => {
  const {
    correo_electronico,
    contraseña,
    nombres,
    apellidos,
    sexo,
    celular,
    fecha_nacimiento,
  } = req.body;
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(contraseña, salt);
  try {
    await ClientModel.create({
      correo_electronico: correo_electronico,
      contraseña: hashPassword,
      nombres: nombres,
      apellidos: apellidos,
      sexo: sexo,
      celular: celular,
      fecha_nacimiento: fecha_nacimiento,
    });
    res.json({ msg: "Registrado exitoxamente" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Solicitud incorrecta" });
  }
};

export const Login = async (req, res) => {
  try {
    const cliente = await ClientModel.findAll({
      where: {
        correo_electronico: req.body.correo_electronico,
      },
    });
    const match = await bcrypt.compare(
      req.body.contraseña,
      cliente[0].contraseña
    );
    if (!match)
      return res.status(400).json({ msg: "La contraseña no coincide" });
    const clienteId = cliente[0].id_cliente;
    const name = cliente[0].nombres;
    const email = cliente[0].correo_electronico;
    const sexo = cliente[0].sexo;

    const accessToken = jwt.sign(
      { clienteId, name, email, sexo },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20s",
      }
    );
    const refreshToken = jwt.sign(
      { clienteId, name, email, sexo },
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

export const GetClient = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await ClientModel.findAll({
      where: { id_cliente: id },
    });
    res.json({ data: data });
  } catch (error) {
    return res.status(404).json({ msg: "Cliente no encontrado",error:error });
  }
};
