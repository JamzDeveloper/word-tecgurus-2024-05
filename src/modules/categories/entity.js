const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  description: String,
  name: { type: String, required: true },
});

const CategoryEntity = mongoose.model("Category", categorySchema);
module.exports = CategoryEntity;

/*

[
  {
    "descripcion": "string",
    "idcategoria": 0,
    "nombre": "string"
  }
]
*/
