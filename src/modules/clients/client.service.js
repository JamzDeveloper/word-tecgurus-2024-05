const { request, response } = require("express");
const Client = require("./client.entity");

const createClient = async (req = request, res = response) => {
  const data = req.body;

  const newClient = await Client.create(data);
  await newClient.save();

  res.json(newClient);
};

module.exports = {
  createClient,
};
