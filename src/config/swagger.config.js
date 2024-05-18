const path = require("path");

// const swaggerJsDoc = require("swagger-jsdoc");

// // const { version } = require("../../package.json");
// const path = require("path");
// const url = "http://localhost:4000";

// const swaggerDefinition = {
//   info: {
//     title: "Node Pos API",
//     version: "1.0.0",
//   },

//   openapi: "3.0.0",
//   produces: ["application/json"],
//   servers: [{ url }],

//   components: {
//     securitySchemes: {
//       bearerAuth: {
//         bearerFormat: "JWT",
//         scheme: "bearer",
//       },
//     },
//   },
// };
// const routes = `${path.join(__dirname, "./modules/users/routes.js")}`;

// console.log(routes);

const swaggerSpec = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Node Pos API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  apis: [
    `${path.join(__dirname, "../modules/*/*entity.js")}`,

    `${path.join(__dirname, "../modules/users/routes.js")}`,
  ],
};

module.exports = swaggerSpec;
