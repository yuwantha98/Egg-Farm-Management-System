//3A2l9ng1w9VnlbyY

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import feedStockRoutes from "./routes/feedStockRoutes.js";
import totalFeedStockRoutes from "./routes/totalFeedStockRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Egg Farm API ✅"));

app.use("/api/feed-stock", feedStockRoutes);
app.use("/api/total-feed-stock", totalFeedStockRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/customers", customerRoutes);

const MONGODB_URI =
  "mongodb+srv://admin:MSsyBGQl0UDXvlfr@cluster0.es84lf8.mongodb.net/egg_farm";

mongoose
  .connect(MONGODB_URI, { autoIndex: true })
  .then(() => {
    console.log("✅ Connected To MongoDB");
    const PORT = 5000;
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB error:", err.message));
