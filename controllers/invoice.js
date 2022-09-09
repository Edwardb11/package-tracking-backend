import InvoiceModel from "../models/invoiceModel.js";

export const AddInvoice = async (req, res) => {
  const { id_paquete, id_metodo_de_pago, cantidad_pagada } = req.body;
  try {
    await InvoiceModel.create({
      id_paquete: id_paquete,
      id_metodo_de_pago: id_metodo_de_pago,
      cantidad_pagada: cantidad_pagada,
    });
    res.json({
      msg: "Factura agregada exitoxamente",
    });
  } catch (error) {
    return res.status(400).json({ msg: "Solicitud incorrecta", error: error });
  }
};
