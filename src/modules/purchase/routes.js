const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields } = require("../../middleware/validate-field");
const { createPurchase, getInventory } = require("./purchase.service");
const { ValidateJwt } = require("../../middleware/validate-jwt");

const routes = Router();

routes.post("/", [ValidateJwt, validateFields], createPurchase);
routes.get("/inventory", getInventory);
module.exports = routes;
