import mongoose from "mongoose";

const feedStockSchema = new mongoose.Schema(
  {
    feedId: { type: Number, required: true, index: true },
    feedName: { type: String, required: true, trim: true },
    qty: { type: Number, required: true, min: 0 },
    cost: { type: Number, required: true, min: 0 },
    updateTime: { type: Date },
  },
  {
    timestamps: { createdAt: false, updatedAt: "updateTime" },
    versionKey: false,
  }
);

const FeedStock =
  mongoose.models.FeedStock || mongoose.model("FeedStock", feedStockSchema);
export default FeedStock;
