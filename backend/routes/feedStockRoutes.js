import { Router } from "express";
import {
  createFeedStock,
  listFeedStock,
} from "../controllers/feedStockController.js";
const router = Router();

router.post("/", createFeedStock);
router.get("/", listFeedStock);

export default router;
