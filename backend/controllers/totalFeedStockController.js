import FeedStock from "../models/FeedStock.js";
import TotalFeedStock from "../models/TotalFeedStock.js";

export async function recalcTotals(feedId) {
  const match = feedId ? { feedId } : {};
  const grouped = await FeedStock.aggregate([
    { $match: match },
    {
      $group: {
        _id: "$feedId",
        quantity: { $sum: "$qty" },
        totalCost: { $sum: { $multiply: ["$qty", "$cost"] } },
      },
    },
  ]);

  if (feedId) {
    const g = grouped[0];
    await TotalFeedStock.findOneAndUpdate(
      { feedId },
      g
        ? { quantity: g.quantity, totalCost: g.totalCost }
        : { quantity: 0, totalCost: 0 },
      { upsert: true, new: true }
    );
    return;
  }
  for (const g of grouped) {
    await TotalFeedStock.findOneAndUpdate(
      { feedId: g._id },
      { quantity: g.quantity, totalCost: g.totalCost },
      { upsert: true, new: true }
    );
  }
}

export const listTotals = async (req, res) => {
  try {
    const docs = await TotalFeedStock.find({});
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
