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
  if (description.length > 200) {
    return res.status(400).json({ message: "Description is too long " });
  }
  if (description.length < 10) {
    return res.status(400).json({ message: "Description is too short" });
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
    res.status(400).json({ message: "Invalid request data" });
  }
};

const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
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
    equipment,
    systemNumber,
  } = req.body;

  try {
    const request = await Request.findById(req.params.id);
    if (request) {
      if (username) request.username = username;
      if (place) request.place = place;
      if (blockNumber) request.blockNumber = blockNumber;
      if (biroNumber) request.biroNumber = biroNumber;
      if (typeOfRequest) request.typeOfRequest = typeOfRequest;
      if (department) request.department = department;
      if (contact) request.contact = contact;
      if (description) request.description = description;
      if (equipment && Array.isArray(equipment)) {
        request.equipment = equipment;
      }
      if (systemNumber) request.systemNumber = systemNumber;
      await request.save();
      res.status(200).json(request);
    } else {
      res.status(404).json({ message: "Request not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating request", error });
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

const getRecentRequests = async (req, res) => {
  try {
    const requests = await Request.find({
      seenByAdmins: false,
    }).sort({
      createdAt: -1,
    });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Error getting recent requests" });
  }
};

const markRequestSeenById = async (req, res) => {
  const { id } = req.params;

  try {
    const request = await Request.findById(id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }
    request.seenByAdmins = true;
    request.status = "Completed";
    await request.save();
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: "Error updating request" });
  }
};

const getEquipment = async (req, res) => {
  const { typeOfRequest } = req.params;
  try {
    const equipment = await Request.find({ typeOfRequest }).select("equipment");
    res.status(200).json(equipment);
  } catch (error) {
    res.status(500).json({ message: "Error getting equipment" });
  }
};

const getTotalEquipment = async (req, res) => {
  try {
    const equipmentList = await Request.aggregate([
      { $unwind: "$equipment" }, // Deconstruct the equipment array
      {
        $group: {
          _id: "$equipment.name",
          totalQuantity: { $sum: "$equipment.quantity" },
        },
      },
      { $project: { _id: 0, name: "$_id", totalQuantity: 1 } }, // Format the response
    ]);

    res.status(200).json(equipmentList);
  } catch (error) {
    console.error("Error fetching equipment:", error);
    res
      .status(500)
      .json({ message: "Error getting equipment", error: error.message });
  }
};

export {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequestById,
  deleteRequestById,
  getRecentRequests,
  markRequestSeenById,
  getEquipment,
  getTotalEquipment,
};
