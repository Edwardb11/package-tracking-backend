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
    let id = "";
    await PackageModel.create({
      id_paquete: id_paquete,
      id_cliente: id_cliente,
      id_usuario_final: id_usuario_final,
      nombre: nombre,
      peso: peso,
      cantidad: cantidad,
      ubicacion: ubicacion,
    }).then((result) => (id = result.id_paquete)),
      PackagesStatesModel.create({
        id_paquetes: id,
        id_estado: 0,
        id_personal: 0,
        ubicacion: ubicacion,
        activo: 1,
      }),
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

export const Tracking = async (req, res) => {
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
  const { id_paquetes, id_estado, id_personal, ubicacion, activo } = req.body;
  console.log(req.body);

  try {
    await PackagesStatesModel.create({
      id_paquetes: id_paquetes,
      id_estado: id_estado,
      id_personal: id_personal,
      ubicacion: ubicacion,
      activo: activo,
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
      include: [
        { model: StateModel },
        {
          model: PackageModel,
          attributes: ["id_paquete", "nombre", "peso", "ubicacion"],
          include: [
            {
              model: EndUsersModel,
              attributes: ["nombres", "apellidos", "celular", "ubicacion"],
            },
          ],
          right: true,
        },
      ],
    });

    res.json({ package: packages });
  } catch (error) {
    return res.status(404).json({ msg: "Paquete no encontrado", error: error });
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
    res.json({ state: data });
  } catch (error) {
    return res.status(404).json({ msg: "Paquete no encontrado", error: error });
  }
};

export const GetPackageReady = async (req, res) => {
  try {
    const data = await PackagesStatesModel.findAll({
      where: { id_estado: 7 },
      attributes: ["creado", "actualizado"],
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
    res.json({
      data: data,
    });
  } catch (error) {
    return res.status(400).json({ msg: "Solicitud incorrecta", error: error });
  }
};

export const GetPackagePendingShipping = async (req, res) => {
  try {
    /* Getting all the packages that are in the state 5. */
    const data = await PackagesStatesModel.findAll({
      where: { id_estado: 5 },
      // attributes: ["creado", "actualizado","ubicacion"],
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
    /* Getting all the packages that are in the state 6. */
    const getMoreStates = await PackagesStatesModel.findAll({
      where: { id_estado: 6 },
      include: [
        {
          model: PackageModel,
        },
      ],
    });

    /* Filtering the data to get the packages that are not in the state 6. */
    let results = [];
    data.filter((i) => {
      console.log(i.paquete.id_paquete);
      getMoreStates.filter((e) => {
        // console.log(i.paquete.id_paquete)
        // console.log(e.paquete.id_paquete !== i.paquete.id_paquete)
        if (i.paquete.id_paquete !== e.paquete.id_paquete) {
          results.push(i);
        } else {
          results = [];
        }
      });
    });
    res.json({
      data: results,
    });
  } catch (error) {
    return res.status(400).json({ msg: "Solicitud incorrecta", error: error });
  }
};
export const GetPackagesShipped = async (req, res) => {
  try {
    /* Getting all the packages that are in the state 6. */
    const data = await PackagesStatesModel.findAll({
      where: { id_estado: 6 },
      // attributes: ["creado", "actualizado","ubicacion"],
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

    const getMoreStates = await PackagesStatesModel.findAll({
      /* Getting all the packages that are in the state 7. */
      where: { id_estado: 7 },
      include: [
        {
          model: PackageModel,
        },
      ],
    });

    /* Filtering the data to get the packages that are not in the state 7. */
    let results = [];
    data.filter((i) => {
      getMoreStates.filter((e) => {
        if (i.paquete.id_paquete !== e.paquete.id_paquete) {
          results.push(i);
        } else {
          results = [];
        }
      });
    });
    res.json({
      data: results,
    });
  } catch (error) {
    return res.status(400).json({ msg: "Solicitud incorrecta", error: error });
  }
};

export const ChangeLastState = async (req, res) => {
  const { id_estado, id_paquetes } = req.body;
  try {
    await PackagesStatesModel.update(
      { activo: 0 },
      {
        where: {
          id_paquetes: id_paquetes,
          id_estado: id_estado,
        },
      }
    );
    return res.sendStatus(200);
  } catch (error) {
    return res
      .status(404)
      .json({ msg: "Paquete no encontrado aa", error: error });
  }
};

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
