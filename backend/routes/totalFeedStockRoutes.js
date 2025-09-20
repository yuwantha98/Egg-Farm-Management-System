import express from "express";
import {
  listTotals,
  getTotalByFeedId,
  deleteTotalByFeedId,
} from "../controllers/totalFeedStockController.js";

const router = express.Router();

// TotalFeedStock routes
router.get("/", listTotals);
router.get("/:feedId", getTotalByFeedId);
router.delete("/:feedId", deleteTotalByFeedId);

export default router;
