import jwt from "jsonwebtoken";
import clientModel from "../models/clientModel.js";
import StaffModel from "../models/staffModel.js";

export const refreshTokenClient = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
    const client = await clientModel.findAll({
      where: {
        token: refreshToken,
      },
    });
    if (!client[0]) return res.sendStatus(403);
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.sendStatus(403);
        const clienteId = client[0].id_cliente;
        const name = client[0].nombres;
        const email = client[0].correo_electronico;
        const sex = client[0].sexo;
        const accessToken = jwt.sign(
          { clienteId, name, email, sex },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "15s",
          }
        );
        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
export const refreshTokenStaff = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
    const staff = await StaffModel.findAll({
      where: {
        token: refreshToken,
      },
    });
    if (!staff[0]) return res.sendStatus(403);
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.sendStatus(403);
        const staffId = staff[0].id_personal;
        const name = staff[0].nombres;
        const email = staff[0].correo_electronico;
        const sex = staff[0].sexo;
        const accessToken = jwt.sign(
          { staffId, name, email, sex },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "15s",
          }
        );
        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
