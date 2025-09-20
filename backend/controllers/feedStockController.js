import FeedStock from "../models/FeedStock.js";
import { recalcTotals } from "./totalFeedStockController.js";

// Create new feedstock
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

// Get all feedstock
export const listFeedStock = async (req, res) => {
  try {
    const docs = await FeedStock.find({});
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get feedstock by ID
export const getFeedStockById = async (req, res) => {
  try {
    const doc = await FeedStock.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ message: "FeedStock not found" });
    }
    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update feedstock
export const updateFeedStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { feedId, feedName, qty, cost } = req.body;

    const doc = await FeedStock.findByIdAndUpdate(
      id,
      { feedId, feedName, qty, cost },
      { new: true, runValidators: true }
    );

    if (!doc) {
      return res.status(404).json({ message: "FeedStock not found" });
    }

    await recalcTotals(doc.feedId);
    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete feedstock
export const deleteFeedStock = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await FeedStock.findByIdAndDelete(id);

    if (!doc) {
      return res.status(404).json({ message: "FeedStock not found" });
    }

    await recalcTotals(doc.feedId);
    res.json({ message: "FeedStock deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Search feedstock
export const searchFeedStock = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const docs = await FeedStock.find({
      $or: [
        { feedName: { $regex: query, $options: "i" } },
        { feedId: isNaN(query) ? null : parseInt(query) },
      ].filter(Boolean),
    });

    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get feedstock by feedId
export const getFeedStockByFeedId = async (req, res) => {
  try {
    const { feedId } = req.params;
    const docs = await FeedStock.find({ feedId: parseInt(feedId) });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
