import express from "express";
import {
  createTicket,
  getTickets,
  getTicketById,
  updateTicketStatus,
  updateTicket,
  deleteTicket,
  getTicketStats,
} from "../controllers/ticketController.js";

const router = express.Router();

// Ticket routes
router.post("/", createTicket);
router.get("/", getTickets);
router.get("/stats", getTicketStats);
router.get("/:id", getTicketById);
router.patch("/:id/status", updateTicketStatus);
router.put("/:id", updateTicket);
router.delete("/:id", deleteTicket);

export default router;
