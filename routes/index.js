import express from "express";
import { Login, Register, Logout, GetClient } from "../controllers/client.js";
import { Package, GetPackage,GetPackageStates  } from "../controllers/package.js";
import { refreshTokenClient, refreshTokenStaff } from "../controllers/refreshToken.js";
import { EndUsers } from "../controllers/endUsers.js";
import { GetStaff, LoginStaff, RegisterStaff } from "../controllers/staff.js";
import { GetStates } from "../controllers/states.js";
import { GetRoles } from "../controllers/roles.js";


const router = express.Router();

// POST
router.post("/register", Register);
router.post("/registerStaff", RegisterStaff);
router.post("/login", Login);
router.post("/loginStaff", LoginStaff);
router.post("/package", Package);
router.post("/addEndUsers", EndUsers);

// GET
router.get("/tokenClient", refreshTokenClient);
router.get("/tokenStaff", refreshTokenStaff);
router.get("/getState", GetStates);
router.get("/getRoles", GetRoles);
router.get("/getPackage/:id", GetPackage);
router.get("/getPackageStates/:id", GetPackageStates);
router.get("/getStaff/:id", GetStaff);
router.get("/getClient/:id", GetClient);


// PUT

// DELETE
router.delete("/logout", Logout);

export default router;
