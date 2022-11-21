import cloudinary from "./../../../services/cloudinary.js";
import empModel from "./../../../DB/models/emp.model.js";

export const getEmployees = async (req, res) => {
  try {
    const GISemployees = await empModel
      .find({ department: "GIS" })
      .select("-__v");
    const HRemployees = await empModel
      .find({ department: "HR" })
      .select("-__v");
    res.status(200).json({
      message: "success",
      GISemployees,
      HRemployees,
      GISCount: GISemployees.length,
      HRCount: HRemployees.length,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addEmployee = async (req, res) => {
  const { first_name, last_name, department } = req.body;
  try {
    if (department !== "GIS" && department !== "HR") {
      return res.status(400).json({ message: "Invalid department" });
    }
    const newEmployee = empModel({ first_name, last_name, department });
    if (req.file) {
      cloudinary.uploader.upload(
        req.file.path,
        { folder: `/users/${newEmployee._id}` },
        async (err, result) => {
          if (err) {
            return res.status(500).json({ message: err });
          } else {
            newEmployee.image = result.secure_url;
            await newEmployee.save();
            return res
              .status(200)
              .json({ message: "added successfuly", newEmployee });
          }
        }
      );
    } else {
      newEmployee.image =
        "https://res.cloudinary.com/demo/image/upload/d_avatar.png/non_existing_id.png";
      await newEmployee.save();
      res.status(201).json({ message: "added successfuly", newEmployee });
    }
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const emp = await empModel.findByIdAndRemove(id);
    if (!emp) {
      return res.status(404).json({ message: "Employee not found" });
    } else {
      res.status(200).json({ message: "Employee deleted successfully" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
