const {
  mongoose,
  express,
  swaggerJsDoc,
  swaggerUI,
  swaggerConfig,
  productsRoutes,
  categoriesRoutes,
  userRoutes,
  authRoutes,
  clientRoutes,
  purchaseRoutes,
} = require("./barrel");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      user: "/users",
      category: "/categories",
      auth: "/auth",
      client: "/clients",
      product: "/products",
      doc: "/api-doc",
      purchase: "/purchase",
    };
    this.specsSwagger = swaggerJsDoc(swaggerConfig);

    this.database();
    this.routes();
    this.middleware();
  }

  middleware() {
    this.app.use(express.json());
  }

  routes() {
    this.app.use(
      this.paths.doc,
      swaggerUI.serve,
      swaggerUI.setup(this.specsSwagger, {
        explorer: true,
      })
    );

    this.app.use(this.paths.product, productsRoutes);
    this.app.use(this.paths.category, categoriesRoutes);
    this.app.use(this.paths.user, userRoutes);
    this.app.use(this.paths.auth, authRoutes);
    this.app.use(this.paths.client, clientRoutes);
    this.app.use(this.paths.purchase, purchaseRoutes);
  }

  async database() {
    await mongoose.connect(
      `${process.env.DATABASE_URI}/${process.env.DATABASE_NAME}`
    );
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`);
    });
  }
}

module.exports = Server;
