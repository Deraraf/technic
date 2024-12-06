import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    department: { type: String, required: true },
    place: { type: String, required: true },
    contact: { type: Number, required: true },
    typeOfRequest: { type: String, required: true },
    blockNumber: { type: Number, required: true },
    biroNumber: { type: Number, required: true },
    description: { type: String, required: true },
    dateRequested: { type: Date, default: Date.now },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

const Request =
  mongoose.models.Request || mongoose.model("Request", requestSchema);

export default Request;
