const { request, response } = require("express");
const UserEntity = require("../modules/users/entity");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req = request, res = response) => {
  const { password, email } = req.body;

  const existUser = await UserEntity.findOne({
    email,
  });

  if (!existUser) {
    return res
      .status(400)
      .json({ message: `Usuario con el email:${email} not found` });
  }

  const match = await bcrypt.compare(password, existUser.password);

  if (!match) {
    return res.status(401).json({ message: `Contraseña incorrecta` });
  }

  const token = jwt.sign(
    {
      _id: existUser._id,
    },
    process.env.SECRET_TOKEN,
    {
      expiresIn: 60 * 60,
    }
  );

  return res.json({
    user: existUser.toJSON(),
    tokens: {
      accessToken: token,
    },
  });
};

module.exports = {
  login,
};
