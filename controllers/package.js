import ClientModel from "../models/clientModel.js";
import EndUsersModel from "../models/endUsersModel.js";
import InvoiceModel from "../models/invoiceModel.js";
import PackageModel from "../models/packageModel.js";
import PackagesStatesModel from "../models/packagesStatesModel.js";
import RolesModel from "../models/rolesModel.js";
import StaffModel from "../models/staffModel.js";
import StateModel from "../models/statesModel.js";

export const Package = async (req, res) => {
  const {
    id_paquete,
    id_cliente,
    id_usuario_final,
    nombre,
    peso,
    cantidad,
    ubicacion,
  } = req.body;
  console.log(req.body);
  try {
    await PackageModel.create({
      id_paquete: id_paquete,
      id_cliente: id_cliente,
      id_usuario_final: id_usuario_final,
      nombre: nombre,
      peso: peso,
      cantidad: cantidad,
      ubicacion: ubicacion,
    });
    res.json({ msg: "Paquete registrado exitoxamente" });
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
        { model: EndUsersModel },
        { model: StateModel },
        { model: InvoiceModel },
      ],
    });
    res.json({ data });
  } catch (error) {
    return res.status(404).json({ msg: "Cliente no encontrado", error: error });
  }
};

export const GetPackageStates = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await PackagesStatesModel.findAll({
      where: { id_paquetes: id },
      include: [
        { model: StateModel },
        {
          model: StaffModel,
          attributes: ["id_personal", "nombres", "apellidos"],
          include: [{ model: RolesModel, attributes: ["nombre"] }],
        },
      ],
    });
    const packages = await PackageModel.findAll({
      where: { id_paquete: id },
      include: [
        {
          model: ClientModel,
          attributes: ["id_cliente", "nombres", "apellidos", "sexo", "celular"],
        },
        {
          model: EndUsersModel,
          attributes: [
            "id_usuario_final",
            "nombres",
            "apellidos",
            "sexo",
            "celular",
          ],
        },
      ],
    });
    res.json({ package: packages, state: data });
  } catch (error) {
    return res.status(404).json({ msg: "Paquete no encontrado", error: error });
  }
};

export const AddPackageStates = async (req, res) => {
  const { id_paquetes, id_estado, id_personal, ubicacion } = req.body;
  console.log(req.body);

  try {
    await PackagesStatesModel.create({
      id_paquetes: id_paquetes,
      id_estado: id_estado,
      id_personal: id_personal,
      ubicacion: ubicacion,
    });
    res.json({ msg: "Estado de paquete registrado exitoxamente" });
  } catch (error) {
    console.log(error);
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .json({ msg: "El estado agregado, ya estaba registrado" });
    }
    return res.status(400).json(error);
  }
};

export const GetPackageAdmin = async (req, res) => {
  try {
    const packages = await PackagesStatesModel.findAll({
      // attributes: ["id_paquete", "nombre", "peso", "ubicacion"],
      include: [
        {
          model: PackageModel,
          right: true,
        },
      ],
    });

    res.json({ package: packages });
  } catch (error) {
    return res.status(404).json({ msg: "Paquete no encontrado", error: error });
  }
};
