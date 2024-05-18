const { Router } = require("express");
const { createUser, getDataUser } = require("./services");
const { check } = require("express-validator");
const { validateFields } = require("../../middleware/validate-field");
const { ValidateJwt } = require("../../middleware/validate-jwt");

const routes = Router();

//create user
/**
 * @swagger
 * /users:
 *  post:
 *    summary: create a new User
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: new user created!!
 *      400:
 *        description: client error
 */
routes.post(
  "/",
  [
    check("email", "correo no valido").isEmail(),
    check("password", "contraseña vacia").not().isEmpty(),
    check("firstName", "nombre requerido").not().isEmpty(),
    // ValidateJwt,
    validateFields,
  ],
  createUser
);

//auth data user
/**
 * @swagger
 * /users/authData:
 *   get:
 *     summary: Ruta segura que requiere autenticación.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Acceso concedido.
 *       401:
 *         description: No autorizado.
 */
routes.get("/authData", ValidateJwt, getDataUser);
// routes.patch("/:id", updatePatchProduct);

// routes.delete("/:id", deleteProduct);

module.exports = routes;
