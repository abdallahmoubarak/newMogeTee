const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String },
    addingDates: { type: Date, default: Date.now },
    description: { type: String },
    hidden: { type: Boolean, default: false },
    titleBackground: { type: String },
    titleColor: { type: String },
    background: { type: String },
    topTitle: { type: String }
  },

  { collection: "categories" }
);

export default mongoose.models.Category ||
  mongoose.model("Category", categorySchema);
