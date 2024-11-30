import Request from "../models/request.js";

const createRequest = async (req, res) => {
  const { name, department, contact, type, description } = req.body;

  if (!name || !department || !contact || !type || !description) {
    throw new Error("Please fill all the inputs.");
  }

  const newRequest = new Request({
    name,
    department,
    contact,
    type,
    description,
  });

  try {
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(400);
    throw new Error("Invalid request data");
  }
};

const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Error getting requests" });
  }
};

const getRequestById = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (request) {
      res.status(200).json(request);
    } else {
      res.status(401).json({ message: "request not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error getting request" });
  }
};

const updateRequestById = async (req, res) => {
  const { name, department, contact, type, description } = req.body;
  try {
    const request = await Request.findById(req.params.id);
    if (request) {
      if (name) {
        request.name = name || request.name;
      }
      if (department) {
        request.department = department || request.department;
      }
      if (contact) {
        request.contact = contact || request.contact;
      }
      if (type) {
        request.type = type || request.type;
      }
      if (description) {
        request.description = description || request.description;
      }
      await request.save();
      res.status(200).json(request);
    } else {
      res.status(401).json({ message: "request not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating request" });
  }
};

const deleteRequestById = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (request) {
      await Request.deleteOne({ _id: req.params.id });
      res.status(200).json(request);
    } else {
      res.status(401).json({ message: "request not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting request" });
  }
};

export {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequestById,
  deleteRequestById,
};
