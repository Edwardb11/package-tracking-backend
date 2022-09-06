import clientModel from "../models/clientModel.js";
import PackageModel from "../models/packageModel.js";
import EndUsersModel from "../models/endUsersModel.js";

export const Package = async (req, res) => {
  const {
    id_paquete,
    id_cliente,
    id_usuario_final,
    nombre,
    peso,
    cantidad,
  } = req.body;
  console.log(req.body)
  try {
    await PackageModel.create({
      id_paquete: id_paquete,
      id_cliente: id_cliente,
      id_usuario_final: id_usuario_final,
      nombre: nombre,
      peso: peso,
      cantidad: cantidad,
    });
    res.json({ msg: "Paquete registrado exitoxamente"});
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Solicitud invalida" });
  }
};

export const GetPackage = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await PackageModel.findAll({
      where: { id_cliente: id },
      include: [
        { model: clientModel },
        { model: EndUsersModel },
      ],
    });
    res.json({ data });
  } catch (error) {
    console.log(error);
  }
};
