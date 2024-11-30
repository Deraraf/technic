import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectedDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

connectedDB();

const app = express();
const port = process.env.PORT || 5000;
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/requests", requestRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
