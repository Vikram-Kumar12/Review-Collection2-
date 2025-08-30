import mongoose from "mongoose";
const roleSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ["Cohort", "Admin"],
    required: true,
  },
});
const Role = mongoose.model("Role", roleSchema);
export default Role;
