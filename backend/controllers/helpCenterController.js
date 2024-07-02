const helpCenterModel = require("../models/helpCenterModel");
const { helpCenterValidationSchema } = require("../middleware/schemaValidator");

const parseISODate = (isoDateString) => {
  const dateParts = isoDateString.split("T")[0]; // Split at 'T' and take the date part
  return new Date(dateParts);
};


// Create a new ticket
const createHelpTicket = async (req, res) => {
  try {
    req.body.dateOfCreation = parseISODate(req.body.dateOfCreation);
    req.body.dateOfCompletion = parseISODate(req.body.dateOfCompletion);
    const { success, data, error } = helpCenterValidationSchema.safeParse(
      req.body
    );
    if (!success) {
      return res.status(400).send(error);
    }

    const ticket = new helpCenterModel(data);
    await ticket.save();

    res.status(201).send(ticket);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all tickets
const getAllTickets = async (req, res) => {
  try {
    const tickets = await helpCenterModel.find();

    const ticketData = tickets.map((ticket) => {
      return {
        ticketId: ticket.ticketId,
        employeeId: ticket.employeeId,
        description: ticket.description,
        department: ticket.department,
        dateOfCreation: ticket.dateOfCreation,
        status: ticket.status,
        assignedTo: ticket.assignedTo,
      };
    });

    res.send(ticketData);
  } catch (error) {
    res.status(500).send;
  }
};


// Get ticket by id
const getTicketById = async (req, res) => {

  try {
    const {id} = req.params;
    if(!id){
      return res.status(400).send("Ticket id is required");
    }

    const ticket = await helpCenterModel.findById(id);

    if (!ticket) {
      return res.status(404).send("Ticket not found");
    }

    res.send(ticket);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update ticket by id
const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { success, data, error } = helpCenterValidationSchema.safeParse(
      req.body
    );
    if (!success) {
      return res.status(400).send(error);
    }

    const ticket = await helpCenterModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!ticket) {
      return res.status(404).send("Ticket not found");
    }

    res.send(ticket);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete ticket by id
const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await helpCenterModel.findByIdAndDelete(id);

    if (!ticket) {
      return res.status(404).send("Ticket not found");
    }

    res.send(ticket);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createHelpTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
};