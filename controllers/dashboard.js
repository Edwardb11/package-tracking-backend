import ClientModel from "../models/clientModel.js";
import EndUsersModel from "../models/endUsersModel.js";
import InvoiceModel from "../models/invoiceModel.js";
import PackageModel from "../models/packageModel.js";
import PackagesStatesModel from "../models/packagesStatesModel.js";
import RolesModel from "../models/rolesModel.js";
import StaffModel from "../models/staffModel.js";
import StateModel from "../models/statesModel.js";
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

/**
 * It gets the total of packages, clients, staff and the total of the invoices
 * @param req - The request object represents the HTTP request and has properties for the request query
 * string, parameters, body, HTTP headers, and so on.
 * @param res - The response object.
 * @returns The total of packages, clients, staff and the total of the invoices.
 */
export const GetCountTotal = async (req, res) => {
  try {
    /* Getting the total of packages, clients, staff and the total of the invoices. */
    const packages = await PackageModel.count();
    const client = await ClientModel.count();
    const Staff = await StaffModel.count({
      where: { activo: true },
    });
    const invoice = await TransactionsModel.findAll({
      attributes: ["monto"],
    });

    /* Adding all the values of the monto attribute of the invoice array. */
    let totalInvoice = 0;
    invoice.map((e) => {
      totalInvoice += e.monto;
    });
    /* Creating an array of objects with the total of packages, clients, staff and the total of the
invoices. */
    let datas = [
      { id: 1, title: "Total de paquetes", total: packages },
      { id: 2, title: "Total de clientes", total: client },
      { id: 3, title: "Total de empleados", total: Staff },
      { id: 4, title: "Total generado", total: totalInvoice },
    ];

    res.json({
      data: datas,
      //   invoice:invoice.monto
    });
  } catch (error) {
    return res.status(400).json({ msg: "Solicitud incorrecta", error: error });
  }
};

/**
 * It fetches the last 10 states from the database and returns them as JSON
 * @param req - The request object.
 * @param res - The response object.
 * @returns The last 10 states of the packages
 */
export const LastStates = async (req, res) => {
  try {
    const data = await PackagesStatesModel.findAll({
      limit: 10,
      order: [["creado", "DESC"]],
      include: [
        { model: StateModel },
        {
          model: StaffModel,
          attributes: ["id_personal", "nombres", "apellidos"],
          include: [{ model: RolesModel, attributes: ["nombre"] }],
        },
      ],
    });
    res.json({ state: data });
  } catch (error) {
    return res.status(404).json({ msg: "Ultimos estados vacio", error: error });
  }
};

/**
 * It takes a request and a response, and returns a response.
 * @param req - The request object.
 * @param res - The response object.
 */
export const LastSend = async (req, res) => {
  try {
    const data = await PackagesStatesModel.findAll({
      where: { id_estado: 7 },
      attributes: ["creado", "actualizado"],
      limit: 1,
      order: [["creado", "DESC"]],
      include: [
        {
          model: PackageModel,
          include: [
            {
              model: ClientModel,
              attributes: ["nombres", "apellidos"],
            },
            {
              model: EndUsersModel,
              attributes: ["nombres", "apellidos", "ubicacion"],
            },
            {
              model: InvoiceModel,
              attributes: ["cantidad_a_pagar",],
            },
          ],
        },
      ],
    });
    res.json({
      data: data,
    });
  } catch (error) {
    return res.status(400).json({ msg: "Solicitud incorrecta", error: error });
  }
};
