import bcrypt from "bcryptjs";
import StaffModel from "../models/staffModel.js";

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
