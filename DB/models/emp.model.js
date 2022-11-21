import mongoose from "mongoose";

const empSchema = new mongoose.Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  department: {
    type: String,
    enum: ["GIS", "HR"],
  },
  image: {
    type: String,
  },
});

const empModel = mongoose.model("Emp", empSchema);
export default empModel;
