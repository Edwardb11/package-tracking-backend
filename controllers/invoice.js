import ClientModel from "../models/clientModel.js";
import EndUsersModel from "../models/endUsersModel.js";
import InvoiceModel from "../models/invoiceModel.js";
import PackageModel from "../models/packageModel.js";
import TransactionsModel from "../models/transactionsModel.js";

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
