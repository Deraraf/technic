import Request from "../models/request.js";

const createRequest = async (req, res) => {
  const {
    username,
    contact,
    department,
    place,
    blockNumber,
    biroNumber,
    typeOfRequest,
    description,
  } = req.body;

  if (
    !username ||
    !department ||
    !place ||
    !contact ||
    !typeOfRequest ||
    !blockNumber ||
    !biroNumber ||
    !description
  ) {
    return res.status(400).json({ message: "Please fill all the inputs." });
  }

  const newRequest = new Request({
    username,
    contact,
    department,
    place,
    blockNumber,
    biroNumber,
    typeOfRequest,
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
  const {
    username,
    contact,
    department,
    place,
    blockNumber,
    biroNumber,
    typeOfRequest,
    description,
  } = req.body;
  try {
    const request = await Request.findById(req.params.id);
    if (request) {
      if (username) {
        request.username = username || request.username;
      }
      if (place) {
        request.place = place || request.place;
      }
      if (blockNumber) {
        request.blockNoumber = blockNoumber || request.blockNumber;
      }
      if (biroNumber) {
        request.biroNumber = biroNumber || request.biroNumber;
      }
      if (typeOfRequest) {
        request.typeOfRequest = typeOfRequest || request.typeOfRequest;
      }
      if (department) {
        request.department = department || request.department;
      }
      if (contact) {
        request.contact = contact || request.contact;
      }
      if (typeOfRequest) {
        request.typeOfRequest = typeOfRequest || request.typeOfRequest;
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
