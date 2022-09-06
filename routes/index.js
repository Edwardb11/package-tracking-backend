import express from "express";
import { Login, Register, Logout } from "../controllers/client.js";
import { Paquete, GetPaquete  } from "../controllers/Paquete.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { UsuarioFinal } from "../controllers/UsuarioFinal.js";


const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/package", Paquete);
router.post("/userFinal", UsuarioFinal);
router.get("/token", refreshToken);
router.get("/getPackage/:id", GetPaquete);
router.delete("/logout", Logout);

export default router;
