const { request, response } = require("express");
const bcrypt = require("bcrypt");

const UserEntity = require("./entity");

const createUser = async (req = request, res = response) => {
  const { password, ...data } = req.body;

  //consulta

  const passwordHash = await generatePassword(password);

  const newUser = await UserEntity.create({
    ...data,
    active: true,
    password: passwordHash,
  });
  await newUser.save();

  const { password: pass, ...rest } = newUser.toJSON();
  res.json(rest);
};

const generatePassword = async (password) => {
  const saltRounds = Number(process.env.BCRYPT_SALT);

  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
};

const getDataUser = async (req = request, res = response) => {
  const user = req.userAuth;
  res.json(user);
};
module.exports = {
  createUser,
  getDataUser
};
