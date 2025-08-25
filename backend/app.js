// app.js (ESM)
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import feedStockRoutes from "./routes/feedStockRoutes.js";
import totalFeedStockRoutes from "./routes/totalFeedStockRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// health-check
app.get("/", (req, res) => res.send("Egg Farm API ✅"));

// routes
app.use("/api/feed-stock", feedStockRoutes);
app.use("/api/total-feed-stock", totalFeedStockRoutes);

// Direct URI here since you said no .env
const MONGODB_URI =
  "mongodb+srv://yuwantha:RTvSDnpVWHVE5mml@cluster0.es84lf8.mongodb.net/egg_farm";

mongoose
  .connect(MONGODB_URI, { autoIndex: true })
  .then(() => {
    console.log("✅ Connected To MongoDB");
    const PORT = 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error("MongoDB error:", err.message));
