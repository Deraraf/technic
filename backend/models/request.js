import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  contact: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  dateRequested: { type: Date, default: Date.now },
  status: { type: String, default: "Pending" },
});

const Request =
  mongoose.models.Request || mongoose.model("Request", requestSchema);

export default Request;
