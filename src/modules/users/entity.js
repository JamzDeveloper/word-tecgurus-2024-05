const mongoose = require("mongoose");
const { Schema } = mongoose;
/**
 *
 *
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        firstName:
 *            type: string
 *            description: The user firstName
 *        email:
 *            type: string
 *        photo:
 *            type: string
 *        amaterno:
 *            type: string
 *        apaterno:
 *            type: string
 *      required:
 *        - firstName
 *        - email
 *        - amaterno
 *        - apaterno
 *      example:
 *        firstName: juan
 *        photo: https://google.com/jamzdeveloper.png
 *        email: test@gmail.com
 *        amaterno: sanchez
 *        apaterno: paredez
 * 
 *
 */
const userSchema = new Schema({
  active: {
    type: Boolean,
    default: true,
  },
  amaterno: {
    type: String,
    required: true,
  },
  apaterno: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
