const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    number: { type: String, unique: true },
    otp: { type: String },
    otptimes: { type: Number },
    jwt: { type: String }
  },
  { collection: "users" }
);
export default mongoose.models.User || mongoose.model("User", userSchema);
