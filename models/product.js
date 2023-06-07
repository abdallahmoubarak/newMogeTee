const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String },
    categoryID: { type: String },
    description: { type: String },
    price: { type: Number, default: 0 },
    usdprice: { type: Number, default: 0 },
    newprice: { type: Number, default: 0 },
    hasImg: { type: Boolean, default: false },
    image: { type: String },
    appear: { type: Boolean, default: true },
    exist: { type: Boolean, default: true },
    hidden: { type: Boolean, default: false }
  },
  { collection: "products" }
);
export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
