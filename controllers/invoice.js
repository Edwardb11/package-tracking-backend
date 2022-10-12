import ClientModel from "../models/clientModel.js";
import EndUsersModel from "../models/endUsersModel.js";
import InvoiceModel from "../models/invoiceModel.js";
import PackageModel from "../models/packageModel.js";
import PackagesStatesModel from "../models/packagesStatesModel.js";

export const AddInvoice = async (req, res) => {
  const { id_paquete, cantidad_a_pagar } = req.body;
  try {
    await InvoiceModel.create({
      id_paquete: id_paquete,
      cantidad_a_pagar: cantidad_a_pagar,
    });
    res.json({
      msg: "Factura agregada exitoxamente",
    });
  } catch (error) {
    return res.status(400).json({ msg: "Solicitud incorrecta", error: error });
  }
};

export const GetInvoice = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await InvoiceModel.findAll({
      where: { id_factura: id },
      include: [
        {
          model: PackageModel,
          include: [
            {
              model: ClientModel,
              attributes: ["nombres", "apellidos", "celular"],
            },
            {
              model: EndUsersModel,
              attributes: ["nombres", "apellidos", "celular", "ubicacion"],
            },
          ],
        },
      ],
    });
    res.json({
      invoice: data,
    });
  } catch (error) {
    return res.status(400).json({ msg: "Solicitud incorrecta", error: error });
  }
};

export const GetInvoicePending = async (req, res) => {
  try {
    const data = await PackagesStatesModel.findAll({
      where: { id_estado: 3 },
      // attributes: ["creado", "actualizado"],
      include: [
        {
          model: PackageModel,
          include: [
            {
              model: ClientModel,
              attributes: ["nombres", "apellidos", "celular"],
            },
            {
              model: EndUsersModel,
              attributes: ["nombres", "apellidos", "celular", "ubicacion"],
            },
            {
              model: InvoiceModel,
              attributes: ["cantidad_a_pagar", "creado", "actualizado"],
            },
          ],
        },
      ],
    });
    const compare = await PackagesStatesModel.findAll({
      where: { id_estado: 4 || 5 || 6 },
      // attributes: ["creado", "actualizado"],
    });

    let result = [];
    data.map((alt) => {
      compare.map((comp) => {
        if (alt.id_paquetes !== comp.id_paquetes) {
          return result.push(alt);
        }
      });
    });
    // console.log(result);
    res.json({
      // data: data,
      compare: result,
    });
  } catch (error) {
    return res.status(400).json({ msg: "Solicitud incorrecta", error: error });
  }
};
