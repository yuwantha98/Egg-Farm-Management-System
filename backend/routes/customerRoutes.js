// routes/customerRoutes.js
import express from "express";
import {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  searchCustomers,
} from "../controllers/customerController.js"; // .js extension must

const router = express.Router();

// Customer routes
router.post("/", createCustomer);
router.get("/", getCustomers);
router.get("/search", searchCustomers);
router.get("/:id", getCustomerById);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

export default router;
