import EndUsersModel from "../models/endUsersModel.js";

export const EndUsers = async (req, res) => {
  const { nombres, apellidos, sexo, ubicacion, celular } = req.body;
  try {
    await EndUsersModel.create({
      nombres: nombres,
      apellidos: apellidos,
      sexo: sexo,
      ubicacion: ubicacion,
      celular: celular,
    });
    res.json({ msg: "Usuario Final registrado exitoxamente" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Algo anda mal", error: error });
  }
};
