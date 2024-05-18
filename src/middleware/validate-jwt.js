const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const UserEntity = require("../modules/users/entity");

const ValidateJwt = async (req = request, res = response, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({
        message: "Acceso denegado",
      });
    }

    const token = req.headers.authorization.split(" ");

    const decoded = jwt.verify(token[1], process.env.SECRET_TOKEN);

    const existUser = await UserEntity.findById(decoded._id);

    if (!existUser) {
      return res.status(401).json({
        message: "Acceso denegado",
      });
    }
    req.userAuth = existUser;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Token invalido",
    });
  }
};
module.exports = {
  ValidateJwt,
};
