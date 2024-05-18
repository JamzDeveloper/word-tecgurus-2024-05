const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
  description: String,
  name: { type: String, required: true },
  price: { type: String, required: true },
  sku: String,
  stock: { type: Number, default: 0 },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

const ProductEntity = mongoose.model("Product", ProductSchema);
module.exports = ProductEntity;
