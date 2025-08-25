import mongoose from "mongoose";

const totalFeedStockSchema = new mongoose.Schema(
  {
    feedId: { type: Number, required: true, unique: true },
    quantity: { type: Number, required: true, default: 0 },
    totalCost: { type: Number, required: true, default: 0 },
  },
  { timestamps: true, versionKey: false }
);

const TotalFeedStock =
  mongoose.models.TotalFeedStock ||
  mongoose.model("TotalFeedStock", totalFeedStockSchema);
export default TotalFeedStock;
