const mongoose = require("mongoose");
const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const swaggerConfig = require("../config/swagger.config");
const productsRoutes = require("../modules/products/routes");
const categoriesRoutes = require("../modules/categories/routes");
const userRoutes = require("../modules/users/routes");
const authRoutes = require("../auth/routes");
const clientRoutes = require("../modules/clients/routes");
const purchaseRoutes = require("../modules/purchase/routes");

module.exports = {
  mongoose,
  express,
  swaggerJsDoc,
  swaggerUI,
  swaggerConfig,
  productsRoutes,
  categoriesRoutes,
  userRoutes,
  authRoutes,
  clientRoutes,
  purchaseRoutes,
};
