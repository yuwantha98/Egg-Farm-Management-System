import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    ticketNumber: {
      type: String,
      required: true,
      unique: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "in progress", "closed", "resolved"],
      default: "open",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
    category: {
      type: String,
      enum: ["technical", "billing", "sales", "general", "support"],
      default: "general",
    },
    dueDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-populate customer details when querying
ticketSchema.pre("find", function () {
  this.populate("customerId");
});

ticketSchema.pre("findOne", function () {
  this.populate("customerId");
});

export default mongoose.model("Ticket", ticketSchema);
