import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectedDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import cookieParser from "cookie-parser";
import User from "./models/user.js";
import Request from "./models/request.js";
import indexRoutes from "./routes/indexRoutes.js";

dotenv.config();

await connectedDB();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(
  cors({
    origin: ["https://technique-one.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    error: err.stack,
  });
});

app.use("/api/users", userRoutes);
app.use("/api/requests", requestRoutes);
app.use("/", indexRoutes);

app.get("/test", (req, res) => {
  res.status(200).json({ message: "Basic route working!" });
});

app.get("/count-users", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({});
    res.json(totalUsers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting users", error: error.message });
  }
});

app.get("/count-requests", async (req, res) => {
  try {
    const totalRequests = await Request.countDocuments({});
    res.json(totalRequests);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting requests", error: error.message });
  }
});

app.get("/count-pending-requests", async (req, res) => {
  try {
    const totalPendingRequests = await Request.countDocuments({
      seenByAdmins: false,
    });
    const realPendingRequests = totalPendingRequests ? totalPendingRequests : 0;
    res.json(realPendingRequests);
  } catch (error) {
    res.status(500).json({
      message: "Error getting pending requests",
      error: error.message,
    });
  }
});

app.get("/count-completed-requests", async (req, res) => {
  try {
    const totalCompletedRequests = await Request.countDocuments({
      seenByAdmins: true,
    });
    const realCompletedRequests = totalCompletedRequests
      ? totalCompletedRequests
      : 0;
    res.json(realCompletedRequests);
  } catch (error) {
    res.status(500).json({
      message: "Error getting completed requests",
      error: error.message,
    });
  }
});

app.get("/count-equipment", async (req, res) => {
  try {
    const totalEquipment = await Request.aggregate([
      { $unwind: "$equipment" }, // Deconstruct the equipment array
      {
        $group: {
          _id: "$equipment.name",
          totalQuantity: { $sum: "$equipment.quantity" },
        },
      },
      { $project: { _id: 0, name: "$_id", totalQuantity: 1 } }, // Format the response
    ]);
    res.json(totalEquipment);
  } catch (error) {
    res.status(500).json({
      message: "Error getting equipment",
      error: error.message,
    });
  }
});

app.get("/get-limit-of-requests", async (req, res) => {
  try {
    const limitOfRequests = await Request.find()
      .sort({ createdAt: -1 })
      .limit(5);
    res.status(200).json(limitOfRequests);
  } catch (error) {
    res.status(500).json({ message: "Error getting limit of requests" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
