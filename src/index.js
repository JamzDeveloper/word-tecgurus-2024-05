require("dotenv").config();

const Server = require("./server/index");

const newServer = new Server();

newServer.listen();
