import express from "express";
import { Login, Register, Logout } from "../controllers/client.js";
import { Package, GetPackage  } from "../controllers/package.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { EndUsers } from "../controllers/endUsers.js";


const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/package", Package);
router.post("/addEndUsers", EndUsers);
router.get("/token", refreshToken);
router.get("/getPackage/:id", GetPackage);
router.delete("/logout", Logout);

export default router;
