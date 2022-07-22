import UsuarioFinal from "../models/UsuarioFinal.js";


export const UsuariosFinal = async (req, res) => {
    const {
        nombres,
        apellidos,
        sexo,
        ubicación,
        celular
} = req.body;
    try {
        await UsuarioFinal.create({
            nombres: nombres,
            apellidos: apellidos,
            sexo: sexo,
            ubicación: ubicación,
            celular:celular
        });
        res.json({ msg: "Usuario Final registrado exitoxamente"});
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: "Algo anda mal", error:error});
    }
};
