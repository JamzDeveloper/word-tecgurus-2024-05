require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const productsRoutes = require("./modules/products/routes");
const categoriesRoutes = require("./modules/categories/routes");
const userRoutes = require("./modules/users/routes");
const authRoutes = require("./auth/routes");
const clientRoutes = require("./modules/clients/routes");
const purchaseRoutes = require("./modules/purchase/routes");
const swaggerConfig = require("./config/swagger.config");

const app = express();
const port = process.env.PORT;

//middlewares
app.use(express.json());

//ROUTES
//documentation swagger
const specs = swaggerJsDoc(swaggerConfig);
app.use(
  "/api-doc",
  swaggerUI.serve,
  swaggerUI.setup(specs, {
    explorer: true,
  })
);

app.use("/products", productsRoutes);

app.use("/categories", categoriesRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/clients", clientRoutes);
app.use("/purchase", purchaseRoutes);

// DATABASE
connectedDatabase().catch((err) => console.log(err));
async function connectedDatabase() {
  await mongoose.connect(
    `${process.env.DATABASE_URI}/${process.env.DATABASE_NAME}`
  );
}

//LISTEN

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
