const { request, response } = require("express");
const CategoryEntity = require("./entity");

const allCategories = async (req = request, res = response) => {
  //   const newCategory = await CategoryEntity.create({
  //     name: "tecnologia",
  //     description: "Tecnologia de punta",
  //   });
  //   newCategory.save();

  const result = await CategoryEntity.find();

  console.log("result", result);
  res.json(result);
};

const createCategory = async (req = request, res = response) => {
  //obtener datos del body

  const { name, description } = req.body;

  if (!name && !description) {
    return res.status(400).json({ message: "Se requiere name y description" });
  }

  const existsCategory = await CategoryEntity.findOne({ name: name });

  if (existsCategory) {
    return res.status(400).json({ message: "Esta categoria ya existe" });
  }

  //crear el objecto de la entidad category
  const newCategory = await CategoryEntity.create({
    name,
    description,
  });

  //guardar
  newCategory.save();

  //retornar la nueva categoria

  return res.json(newCategory);
};

const updateCategory = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const existsCategory = await CategoryEntity.findById(id);

    if (!existsCategory) {
      return res
        .status(400)
        .json({ message: `No existe categoria con el id: ${id}` });
    }
    await existsCategory.updateOne(data);

    return res.json(true);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updatePatchCategory = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const existsCategory = await CategoryEntity.findById(id);

    if (!existsCategory) {
      return res
        .status(400)
        .json({ message: `No existe categoria con el id: ${id}` });
    }
    await existsCategory.updateOne({
      $set: { ...data },
    });

    return res.json(true);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// const deleteCategory = (req = request, res = response) => {
//   res.json(categories);
// };

module.exports = {
  allCategories,
  createCategory,
  updateCategory,
  updatePatchCategory,
  //   deleteCategory,
};
