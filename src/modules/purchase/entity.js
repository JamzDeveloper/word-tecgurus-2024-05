const { Schema, model, Types } = require("mongoose");

const PurchaseProductsSchema = new Schema({
  quantity: { type: Number, required: true, default: 1 },
  totalPrice: { type: Number, required: true },
  product: { type: Types.ObjectId, ref: "Product", required: true },
});
const purchaseSchema = new Schema(
  {
    client: { type: Types.ObjectId, ref: "Client" },
    code: { type: String, required: true },
    products: [PurchaseProductsSchema],
    total: { type: Number, required: true },
    user: { type: Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Purchase = model(`Purchase`, purchaseSchema);

module.exports = Purchase;
