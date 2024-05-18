const { Schema, model } = require("mongoose");
/**
 *
 *
 * @swagger
 * components:
 *  schemas:
 *    Client:
 *      type: object
 *      properties:
 *        name:
 *            type: string
 *            description: The user name
 *      required:
 *        - name
 *      example:
 *        name: juan
 *
 */
const clientSchema = new Schema({
  name: { type: String, required: true },
  apaterno: { type: String, required: true },
  amaterno: { type: String, required: true },
  rfc: { type: String, required: true },
});

const Client = model(`Client`, clientSchema);

module.exports = Client;
