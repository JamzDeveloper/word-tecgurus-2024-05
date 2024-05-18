const { Router } = require("express");
const { check } = require("express-validator");

const { createClient } = require("./client.service");
const { validateFields } = require("../../middleware/validate-field");

const routes = Router();

routes.post(
  "/",
  [
    check("name", "nombre es requerido").not().isEmpty(),
    check("apaterno", "apaterno requerido").not().isEmpty(),
    check("amaterno", "amaterno requerido").not().isEmpty(),
    check("rfc", "rfc requerido").not().isEmpty(),
    // ValidateJwt,
    validateFields,
  ],
  createClient
);
module.exports = routes;
