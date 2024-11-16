const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");

// @desc  Get user Ticket
// @route  GET /api/tickets
// @access  Private
const getTickets = asyncHandler(async (req, res) => {
   //get user using the id and jwt
   const user = await User.findById(req.user.id);

   if (!user) {
      res.status(401);
      throw new Error("User not found");
   }

   const tickets = await Ticket.find({ user: req.user.id });

   res.status(200).json(tickets);
});

// @desc  Get user Ticket (Single Ticket)
// @route  GET /api/tickets/:id
// @access  Private
const getTicket = asyncHandler(async (req, res) => {
   //get user using the id and jwt
   const user = await User.findById(req.user.id);

   if (!user) {
      res.status(401);
      throw new Error("User not found");
   }

   const ticket = await Ticket.findById(req.params.id);
   //here, id is coming from url, using that we are finding that single ticket

   if (!ticket) {
      res.status(404);
      throw new Error("Ticket not Found!");
   }

   if (ticket.user.toString() != req.user.id) {
      res.status(401);
      throw new Error("Not Authorized");
   }

   res.status(200).json(ticket);
});

// @desc Create New tIcket
// @route  POST /api/tickets
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
   const { product, description } = req.body;
   if (!product || !description) {
      res.status(400);
      throw new Error("Please add a product and description");
   }

   //get user using the id and jwt
   const user = await User.findById(req.user.id);

   if (!user) {
      res.status(401);
      throw new Error("User not found");
   }

   const ticket = await Ticket.create({
      product,
      description,
      user: req.user.id,
      status: "new",
   });

   res.status(200).json(ticket);
});

// @desc  Update Ticket (Single Ticket)
// @route  PUT /api/tickets/:id
// @access  Private
const updateTicket = asyncHandler(async (req, res) => {
   //get user using the id and jwt
   const user = await User.findById(req.user.id);

   if (!user) {
      res.status(401);
      throw new Error("User not found");
   }

   const ticket = await Ticket.findById(req.params.id);
   //here, id is coming from url, using that we are finding that single ticket

   if (!ticket) {
      res.status(404);
      throw new Error("Ticket not Found!");
   }

   if (ticket.user.toString() != req.user.id) {
      res.status(401);
      throw new Error("Not Authorized");
   }

   //Updated Ticket Functionality
   // const { product, description } = req.body;

   const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
   );
   //above line, new:true means if this tickety is not already there then create it and we are getting whatever user is passing in body, like product or description, my way was also correct, in which i was destructuring and taking just product and description first and then updating just those two

   res.status(200).json(updatedTicket);
});

// @desc  Delete a ticket
// @route  DELETE /api/tickets/:id
// @access  Private
const deleteTicket = asyncHandler(async (req, res) => {
   //get user using the id and jwt
   const user = await User.findById(req.user.id);

   if (!user) {
      res.status(401);
      throw new Error("User not found");
   }

   const ticket = await Ticket.findById(req.params.id);
   //here, id is coming from url, using that we are finding that single ticket

   if (!ticket) {
      res.status(404);
      throw new Error("Ticket not Found!");
   }

   if (ticket.user.toString() != req.user.id) {
      res.status(401);
      throw new Error("Not Authorized");
   }

   await ticket.deleteOne();

   res.status(200).json({ success: true });
});

module.exports = {
   getTickets,
   createTicket,
   getTicket,
   updateTicket,
   deleteTicket,
};
