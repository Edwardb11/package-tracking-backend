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
    }).then((result) =>
      res.json({
        msg: "Usuario Final registrado exitoxamente",
        id: result.id_usuario_final,
      })
    );
  } catch (error) {
    return res.status(400).json({ msg: "Solicitud incorrecta", error: error });
  }
};
