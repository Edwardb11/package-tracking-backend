import ClientModel from "../models/clientModel.js";
import EndUsersModel from "../models/endUsersModel.js";
import InvoiceModel from "../models/invoiceModel.js";
import PackageModel from "../models/packageModel.js";
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
      include: [
        {
          model: InvoiceModel,
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
        },
        { model: PaymentMethodModel },
      ],
    });
    if (data.length === 0) {
      res.status(200).json({
        paid: false,
      });
    } else {
      res.status(200).json({
        transaction: data,
        paid: true,
      });
    }
  } catch (error) {
    return res
      .status(404)
      .json({ msg: "Transsacion no encontrada", paid: false });
  }
};
