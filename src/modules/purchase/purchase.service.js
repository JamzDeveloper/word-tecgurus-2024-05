const { response, request } = require("express");
const ClientEntity = require("../clients/client.entity");
const ProductEntity = require("../products/entity");
const PurchaseEntity = require("./entity");
const { v4 } = require("uuid");

const _createArrayPromise = (products = []) => {
  return products.map((e) => {
    return new Promise(async (resolver, reject) => {
      try {
        const productFound = await ProductEntity.findById(e.product).populate(
          "category"
        );

        if (!productFound) {
          reject(`Producto con el id :${e.product} not existe o no valido`);
        }

        if (e.quantity > productFound.stock) {
          reject(
            `La cantidad que piden del product ${productFound.name} no es validad`
          );
        }

        resolver({
          ...e,
          product: productFound.toJSON(),
        });
      } catch (err) {
        reject(`Producto con el id :${e.product} not existe o no valido`);
      }
    });
  });
};

const createPurchase = async (req = request, res = response) => {
  try {
    const { products, client, total } = req.body;

    //validar client,

    const clientFound = await ClientEntity.findById(client);
    if (!clientFound) {
      return res.status(400).json({
        message: "Client not found",
      });
    }

    //traer usuario
    const { userAuth } = req;

    //validar cada uno de los productos si existe
    const arrayPromise = _createArrayPromise(products);

    const result = await Promise.all(arrayPromise);

    const newPurchase = await PurchaseEntity.create({
      client: clientFound._id,
      user: userAuth._id,
      code: v4(),
      products,
      total,
    });
    await newPurchase.save();

    res.json({
      ...newPurchase.toJSON(),
      client: clientFound,
      user: userAuth,
      products: result,
    });
  } catch (err) {
    return res.status(400).json({
      message: err,
    });
  }
};

const getInventory = async (req = request, res = response) => {
  const result = await PurchaseEntity.aggregate([
    {
      $unwind: "$products",
    },
    {
      $lookup: {
        from: "products",
        localField: "products.product",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    {
      $group: {
        _id: "$products.product",
        nombre: { $first: "$productDetails.name" },
        cantidadvendidos: { $sum: "$products.quantity" },
        ventastotales: {
          $sum: { $multiply: ["$products.quantity", "$products.totalPrice"] },
        },
        stock: { $first: "$productDetails.stock" },
      },
    },
    {
      $project: {
        _id: 0,
        idproducto: "$_id",
        nombre: 1,
        cantidadvendidos: 1,
        ventastotales: 1,
        stock: 1,
      },
    },
  ]);

  console.log(result);

  res.send(result);

  /*
[
  {
    "cantidadvendidos": 0,
    "idproducto": 0,
    "nombre": "string",
    "stock": 0,
    "ventastotales": 0
  }
]*/
};
module.exports = {
  createPurchase,
  getInventory,
};
