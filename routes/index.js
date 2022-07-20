import express from "express";
import { Login,Register,Logout } from "../controllers/Cliente.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

export default router;
