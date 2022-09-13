import InvoiceModel from "../models/invoiceModel.js";

export const AddInvoice = async (req, res) => {
  const {id_paquete, cantidad_a_pagar } = req.body;
  try {
    await InvoiceModel.create({
      id_paquete:id_paquete,
      cantidad_a_pagar: cantidad_a_pagar,
    });
    res.json({
      msg: "Factura agregada exitoxamente",
    });
  } catch (error) {
    return res.status(400).json({ msg: "Solicitud incorrecta", error: error });
  }
};
