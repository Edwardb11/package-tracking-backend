import PaymentMethodModel from "../models/paymentMethodModel.js";

export const GetPaymentMethod = async (req, res) => {
  try {
    const data = await PaymentMethodModel.findAll();
    res.json({ data: data });
  } catch (error) {
    return res.status(400).json({ msg: "Solicitu incorrecta" });
  }
};
