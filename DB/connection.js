import mongoose from "mongoose";

const connectDB = async () => {
  return await mongoose
    .connect(process.env.MONGO_DEPLOYMENT)
    .then(() => {
      console.log("DB Connected");
    })
    .catch((err) => {
      console.log("DB Connection Error: ", err.message);
    });
};

export default connectDB;
