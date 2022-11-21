import dotenv from "dotenv";
dotenv.config();
import express from "express";
import * as allRoutes from "./modules/index.routes.js";
import connectDB from "./DB/connection.js";
import cors from "cors";

let PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/v1/employee", allRoutes.employeeRouter);
connectDB();
app.listen(PORT, () => {
  console.log("server is running on port 3000");
});
