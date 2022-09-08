import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import RolesModel from "../models/rolesModel.js";
import StaffModel from "../models/staffModel.js";
import StaffRolesModel from "../models/staffRolesModel.js";

export const RegisterStaff = async (req, res) => {
  const {
    correo_electronico,
    contraseña,
    nombres,
    apellidos,
    sexo,
    niveles_estudios,
  } = req.body;
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(contraseña, salt);
  try {
    await StaffModel.create({
      correo_electronico: correo_electronico,
      contraseña: hashPassword,
      nombres: nombres,
      apellidos: apellidos,
      sexo: sexo,
      niveles_estudios: niveles_estudios,
    });
    res.json({ msg: "Registrado exitoxamente" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Solicitud incorrecta" });
  }
};

export const GetStaff = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await StaffRolesModel.findAll({
      where: { id_personal: id },
      include: [
        {
          model: RolesModel,
        },
        { model: StaffModel },
      ],
    });
    res.json({ data: data });
  } catch (error) {
    console.log(error);
  }
};


export const LoginStaff = async (req, res) => {
  try {
    const staff = await StaffModel.findAll({
      where: {
        correo_electronico: req.body.correo_electronico,
      },
      include:[{model:RolesModel,attributes:['id_roles','nombre']}]
    });
    const match = await bcrypt.compare(
      req.body.contraseña,
      staff[0].contraseña
    );

    if (!match)
      return res.status(400).json({ msg: "La contraseña no coincide" });
    const staffId = staff[0].id_personal;
    const name = staff[0].nombres;
    const email = staff[0].correo_electronico;
    const sexo = staff[0].sexo;

    // const getRol = await StaffModel.findAll({
    //   where: {
    //     id_personal: staffId,
    //   },
    //   include:[{model:RolesModel}]
    // });

    const accessToken = jwt.sign(
      { staffId, name, email, sexo },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20s",
      }
    );
    const refreshToken = jwt.sign(
      { staffId, name, email, sexo },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );
    await StaffModel.update(
      { token: refreshToken },
      {
        where: {
          id_personal: staffId,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    const rol = staff[0].roles
    res.json({
      accessToken,
      login: true,
      msg: "Datos correctos",
      id: staffId,
      rol:rol
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "El correo electrónico no encontrado" });
  }
};