const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");

// @desc  Get user Ticket
// @route  GET /api/tickets
// @access  Private
const getTickets = asyncHandler(async (req, res) => {
   res.status(200).json({ message: "getTcikets" });
});

// @desc Create New tIcket
// @route  POST /api/tickets
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
   res.status(200).json({ message: "  createTcikets" });
});

module.exports = { getTickets, createTicket };
