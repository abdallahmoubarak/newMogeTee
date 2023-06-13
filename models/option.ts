import mongoose from "mongoose";

const optionSchema = new mongoose.Schema(
  {
    rate: { type: Number },
  },
  { collection: "options" },
);
export default mongoose.models.Option || mongoose.model("Option", optionSchema);
