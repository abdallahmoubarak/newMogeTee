import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
    hidden: { type: Boolean, default: false },
    titleBackground: { type: String },
    titleColor: { type: String },
    background: { type: String },
    topTitle: { type: String },
    createdAt: { type: Date, default: Date.now },
  },

  { collection: "categories" },
);

export default mongoose.models.Category ||
  mongoose.model("Category", categorySchema);
