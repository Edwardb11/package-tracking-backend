import ClientModel from "../models/clientModel.js";
import PackageModel from "../models/packageModel.js";
import PackagesStatesModel from "../models/packagesStatesModel.js";
import StaffModel from "../models/staffModel.js";
import TransactionsModel from "../models/transactionsModel.js";

/**
 * It gets the data from the database and creates an array of objects with the name of the state and
 * the quantity of packages that are in that state
 * @param req - Request object.
 * @param res - The response object.
 * @returns An array of objects with the name of the state and the quantity of packages that are in
 * that state.
 */
export const GetAreaCharts = async (req, res) => {
  try {
    const data = await PackagesStatesModel.findAll({});
    /* Creating an array for each state. */
    let pendiente = [];
    let recogido = [];
    let envalijado = [];
    let logistica = [];
    let pendPago = [];
    let pendEnvio = [];
    let enviado = [];
    let entregado = [];
    /* Creating an array for each state. */
    data.map((e, i) => {
      if (e.id_estado === 0 && e.activo) {
        pendiente.push(e.id_paquetes);
      } else if (e.id_estado === 1 && e.activo) {
        recogido.push(e.id_paquetes);
      } else if (e.id_estado === 2 && e.activo) {
        envalijado.push(e.id_paquetes);
      } else if (e.id_estado === 3 && e.activo) {
        logistica.push(e.id_paquetes);
      } else if (e.id_estado === 4 && e.activo) {
        pendPago.push(e.id_paquetes);
      } else if (e.id_estado === 5 && e.activo) {
        pendEnvio.push(e.id_paquetes);
      } else if (e.id_estado === 6 && e.activo) {
        enviado.push(e.id_paquetes);
      } else if (e.id_estado === 7 && e.activo) {
        entregado.push(e.id_paquetes);
      }
    });
    /* Creating an array of objects with the name of the state and the quantity of packages that are in
  that state. */

    let datas = [
      { name: "Pendiente", cantidad: pendiente.length },
      { name: "Recogido", cantidad: recogido.length },
      { name: "Envalijado", cantidad: envalijado.length },
      { name: "logistica", cantidad: logistica.length },
      { name: "Pend. pago", cantidad: pendPago.length },
      { name: "Pend. envio", cantidad: pendEnvio.length },
      { name: "Enviado", cantidad: enviado.length },
      { name: "Entregado", cantidad: entregado.length },
    ];

    res.json({
      data: datas,
    });
  } catch (error) {
    return res.status(400).json({ msg: "Solicitud incorrecta", error: error });
  }
};

/**
 * This function gets the area charts history from the database.
 * @param req - The request object
 * @param res - The response object that will be sent back to the client.
 */
export const GetAreaChartsHistory = async (req, res) => {
  try {
    const data = await PackagesStatesModel.findAll({});
    /* Creating an array for each state. */
    let pendiente = [];
    let recogido = [];
    let envalijado = [];
    let logistica = [];
    let pendPago = [];
    let pendEnvio = [];
    let enviado = [];
    let entregado = [];
    /* Creating an array for each state. */
    data.map((e, i) => {
      if (e.id_estado === 0) {
        pendiente.push(e.id_paquetes);
      } else if (e.id_estado === 1) {
        recogido.push(e.id_paquetes);
      } else if (e.id_estado === 2) {
        envalijado.push(e.id_paquetes);
      } else if (e.id_estado === 3) {
        logistica.push(e.id_paquetes);
      } else if (e.id_estado === 4) {
        pendPago.push(e.id_paquetes);
      } else if (e.id_estado === 5) {
        pendEnvio.push(e.id_paquetes);
      } else if (e.id_estado === 6) {
        enviado.push(e.id_paquetes);
      } else if (e.id_estado === 7) {
        entregado.push(e.id_paquetes);
      }
    });
    /* Creating an array of objects with the name of the state and the quantity of packages that are in
  that state. */

    let datas = [
      { name: "Pendiente", cantidad: pendiente.length },
      { name: "Recogido", cantidad: recogido.length },
      { name: "Envalijado", cantidad: envalijado.length },
      { name: "logistica", cantidad: logistica.length },
      { name: "Pend. pago", cantidad: pendPago.length },
      { name: "Pend. envio", cantidad: pendEnvio.length },
      { name: "Enviado", cantidad: enviado.length },
      { name: "Entregado", cantidad: entregado.length },
    ];

    res.json({
      data: datas,
    });
  } catch (error) {
    return res.status(400).json({ msg: "Solicitud incorrecta", error: error });
  }
};


