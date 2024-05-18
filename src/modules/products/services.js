const { request, response } = require("express");
const ProductEntity = require("./entity");
const CategoryEntity = require("../categories/entity");

const createProduct = async (req = request, res = response) => {
  const data = req.body;
  await validateCategory(req, res);

  const newProduct = await ProductEntity.create({
    ...data,
  });
  await newProduct.save();

  res.json(newProduct);
};

const allProducts = async (req = request, res = response) => {
  const result = await ProductEntity.find().populate({
    path: "category",
    model: "Category",
  });
  res.json(result);
};

const deleteProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const existsProduct = await ProductEntity.findById(id);
  if (!existsProduct) {
    return res
      .status(400)
      .json({ message: `Producto con el id:${id} no existe` });
  }
  const result = await existsProduct.deleteOne();

  res.json(result ? true : false);
};

const updatePatchProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const existsProduct = await ProductEntity.findById(id);
  if (!existsProduct) {
    return res
      .status(400)
      .json({ message: `Producto con el id:${id} no existe` });
  }

  await validateCategory(req, res);

  const result = await existsProduct.updateOne({
    $set: {
      ...req.body,
    },
  });

  res.json(result ? true : false);
};

const validateCategory = async (req = request, res = response) => {
  const { category } = req.body;

  if (category) {
    const existCategory = await CategoryEntity.findById(category);
    if (!existCategory) {
      return res
        .status(400)
        .json({ message: `Category con el id:${category} no existe` });
    }
  }
};

const searchProduct = async (req = request, res = response) => {
  const data = req.query;

  if (!data.name) {
    res.status(400).json({ message: "name is required" });
  }


  const result = await ProductEntity.find({
    name: { $regex: data.name },
  });

  res.json(result);
};
module.exports = {
  createProduct,
  allProducts,
  deleteProduct,
  updatePatchProduct,
  searchProduct,
};
