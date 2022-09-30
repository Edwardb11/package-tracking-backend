import express from "express";
import { Login, Register, Logout, GetClient } from "../controllers/client.js";
import {
  Package,
  GetPackage,
  GetPackageStates,
} from "../controllers/package.js";
import {
  refreshTokenClient,
  refreshTokenStaff,
} from "../controllers/refreshToken.js";
import { EndUsers } from "../controllers/endUsers.js";
import {
  GetStaff,
  GetStaffID,
  LoginStaff,
  LogoutStaff,
  RegisterStaff,
  RemoveStaff,
  StaffRol,
} from "../controllers/staff.js";
import { GetStates } from "../controllers/states.js";
import { GetRoles } from "../controllers/roles.js";
import { GetPaymentMethod } from "../controllers/paymentMethod.js";
import { AddInvoice, GetInvoice } from "../controllers/invoice.js";
import {
  GetPaymentTransaction,
  PaymentTransaction,
} from "../controllers/transactions.js";

const router = express.Router();

// POST
router.post("/register", Register);
router.post("/registerStaff", RegisterStaff);
router.post("/login", Login);
router.post("/loginStaff", LoginStaff);
router.post("/package", Package);
router.post("/addEndUsers", EndUsers);
router.post("/addInvoice", AddInvoice);
router.post("/paymentTransaction", PaymentTransaction);
router.post("/addStaffRol", StaffRol);

// GET
router.get("/tokenClient", refreshTokenClient);
router.get("/tokenStaff", refreshTokenStaff);
router.get("/getState", GetStates);
router.get("/getRoles", GetRoles);
router.get("/getPayment", GetPaymentMethod);
router.get("/getPackage/:id", GetPackage);
router.get("/getPackageStates/:id", GetPackageStates);
router.get("/getStaffID/:id", GetStaffID);
router.get("/getStaff", GetStaff);
router.get("/getClient/:id", GetClient);
router.get("/getPaymentTransaction/:id", GetPaymentTransaction);
router.get("/getInvoice/:id", GetInvoice);

// PUT

// DELETE
router.delete("/logout/:id", Logout);
router.delete("/removeStaff/:id", RemoveStaff);
router.delete("/logoutStaff", LogoutStaff);

export default router;
