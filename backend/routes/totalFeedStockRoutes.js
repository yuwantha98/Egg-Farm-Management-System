import { Router } from "express";
import { listTotals } from "../controllers/totalFeedStockController.js";
const router = Router();

router.get("/", listTotals);

export default router;
