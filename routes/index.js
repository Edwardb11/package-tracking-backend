import express from "express";
import { Login, Register, Logout } from "../controllers/Cliente.js";
import { Paquete } from "../controllers/Paquete.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { UsuariosFinal } from "../controllers/UsuarioFinal.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/package", Paquete);
router.post("/userFinal", UsuariosFinal);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

export default router;
