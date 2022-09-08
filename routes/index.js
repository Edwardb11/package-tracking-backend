import express from "express";
import { Login, Register, Logout, GetClient } from "../controllers/client.js";
import { Package, GetPackage,GetPackageStates  } from "../controllers/package.js";
import { refreshToken } from "../controllers/refreshToken.js";
import { EndUsers } from "../controllers/endUsers.js";
import { GetStaff, RegisterStaff } from "../controllers/staff.js";
import { GetStates } from "../controllers/states.js";


const router = express.Router();

// POST
router.post("/register", Register);
router.post("/registerStaff", RegisterStaff);
router.post("/login", Login);
router.post("/package", Package);
router.post("/addEndUsers", EndUsers);

// GET
router.get("/token", refreshToken);
router.get("/getState", GetStates);
router.get("/getPackage/:id", GetPackage);
router.get("/getPackageStates/:id", GetPackageStates);
router.get("/getStaff/:id", GetStaff);
router.get("/getClient/:id", GetClient);


// PUT

// DELETE
router.delete("/logout", Logout);

export default router;
