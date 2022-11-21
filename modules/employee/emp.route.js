import { Router } from "express";
import upload from "../../services/multer.js";
import {
  addEmployee,
  getEmployees,
  deleteEmployee,
} from "./controller/emp.controller.js";

const router = Router();

router.get("/", getEmployees);

router.post("/add", upload.single("image"), addEmployee);

router.delete("/delete/:id", deleteEmployee);

export default router;
