import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`DataBase connected successfully!`);
  } catch (error) {
    console.log(`DataBase connect failed!`);
    process.exit(1);
  }
};
export default connectDB;
