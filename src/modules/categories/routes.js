const { Router } = require("express");
const {
  allCategories,
  createCategory,
  updateCategory,
  updatePatchCategory,
} = require("./services");
const routes = Router();

routes.get("/", allCategories);

routes.post("/", createCategory);

routes.put("/:id", updateCategory);

routes.patch("/:id", updatePatchCategory);

// routes.delete("/:id", deleteCategory);

module.exports = routes;
