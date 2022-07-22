import Paquetes from "../models/PaqueteModel.js";


export const Paquete = async (req, res) => {
    const {
        id_paquetes,
        id_clientes,
        id_usuario_final,
        tipo_paquete,
        nombre,
        peso,
        cantidad } = req.body;
    try {
        await Paquetes.create({
            id_paquetes: id_paquetes,
            id_clientes: id_clientes,
            id_usuario_final: id_usuario_final,
            tipo_paquete: tipo_paquete,
            nombre: nombre,
            peso: peso,
            cantidad: cantidad
        });
        res.json({ msg: "Paquete registrado exitoxamente"});
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: "Algo anda mal"});
    }
};
