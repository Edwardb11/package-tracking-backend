import InvoiceModel from "../models/invoiceModel.js";
import PaymentMethodModel from "../models/paymentMethodModel.js";
import TransactionsModel from "../models/transactionsModel.js";

export const PaymentTransaction = async (req, res) => {
  const { id_metodo_de_pago, id_factura, monto } = req.body;
  try {
    await TransactionsModel.create({
      id_metodo_de_pago: id_metodo_de_pago,
      id_factura: id_factura,
      monto: monto,
    });
    res.json({
      msg: "Transsaccion realizada exitoxamente",
    });
  } catch (error) {
    return res.status(400).json({ msg: "Solicitud incorrecta", error: error });
  }
};

export const GetPaymentTransaction = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await TransactionsModel.findAll({
      where: { id_factura: id },
      include: [{ model: InvoiceModel }],
    });
    if (data.length === 0) {
      res.status(200).json({
        paid: false,
      });
    }
    else{
    res.status(200).json({
      data: data,
      paid: true,
    });
  }
  } catch (error) {
    return res
      .status(404)
      .json({ msg: "Transsacion no encontrada", paid: false });
  }
};
