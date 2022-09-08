import RolesModel from "../models/rolesModel.js";

export const GetRoles = async (req, res) => {
  try {
    const data = await RolesModel.findAll();
    res.json({ data: data });
  } catch (error) {
    return res.status(400).json({ msg: "Solicitu incorrecta" });
  }
};
