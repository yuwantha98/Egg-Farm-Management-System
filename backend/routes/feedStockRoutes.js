import express from "express";
import {
  createFeedStock,
  listFeedStock,
  getFeedStockById,
  updateFeedStock,
  deleteFeedStock,
  searchFeedStock,
  getFeedStockByFeedId,
} from "../controllers/feedStockController.js";

const router = express.Router();

// FeedStock routes
router.post("/", createFeedStock);
router.get("/", listFeedStock);
router.get("/search", searchFeedStock);
router.get("/feedId/:feedId", getFeedStockByFeedId);
router.get("/:id", getFeedStockById);
router.put("/:id", updateFeedStock);
router.delete("/:id", deleteFeedStock);

export default router;
