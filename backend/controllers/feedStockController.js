import FeedStock from "../models/FeedStock.js";
import { recalcTotals } from "./totalFeedStockController.js";

export const createFeedStock = async (req, res) => {
  try {
    const { feedId, feedName, qty, cost } = req.body;
    const doc = await FeedStock.create({ feedId, feedName, qty, cost });
    await recalcTotals(feedId);
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const listFeedStock = async (req, res) => {
  try {
    const docs = await FeedStock.find({});
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
