const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields } = require("../middleware/validate-field");

const { login } = require("./services");

const routes = Router();
/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
routes.post(
  "/",
  [
    check("email", "correo no valido").isEmail(),
    check("password", "contraseña vacia").not().isEmpty(),

    validateFields,
  ],
  login
);

module.exports = routes;
