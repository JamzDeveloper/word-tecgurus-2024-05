const { Router } = require("express");

const {
  createProduct,
  allProducts,
  deleteProduct,
  updatePatchProduct,
  searchProduct
} = require("./services");
const { validateFields } = require("../../middleware/validate-field");
const { ValidateJwt } = require("../../middleware/validate-jwt");

const routes = Router();

routes.get("/", allProducts);

routes.get("/search", searchProduct);

routes.post("/", ValidateJwt, createProduct);

routes.patch("/:id", updatePatchProduct);

routes.delete("/:id", deleteProduct);

module.exports = routes;
