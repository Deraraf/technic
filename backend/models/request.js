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
    description: {
      type: String,
      required: true,
      maxlength: 200,
      minlength: 10,
    },
    dateRequested: { type: Date, default: Date.now },
    status: { type: String, default: "Pending..." },
    seenByAdmins: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    equipment: [
      {
        name: { type: String },
        quantity: { type: Number },
        status: { type: String, default: "Used" }, // Optional status
      },
    ],
    professional: [
      {
        name: { type: String },
        role: { type: String },
      },
    ],
    systemNumber: { type: Number },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },

  { timestamps: true }
);

const Request =
  mongoose.models.Request || mongoose.model("Request", requestSchema);

export default Request;
