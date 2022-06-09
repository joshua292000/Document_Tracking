const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const { roles } = require("../models");
const db = require("../models");
const Usuario = db.usuario;
const Roles = db.roles;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No se proporciono ningún token!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Desautorizado!" });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  Usuario.findById(req.userId).exec((err, usuario) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Roles.find(
      {
        _id: { $in: usuario.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].nombre === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Requiere el rol de administrador!" });
        return;
      }
    );
  });
};

isModerator = (req, res, next) => {
  Usuario.findById(req.userId).exec((err, usuario) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    roles.find(
      {
        _id: { $in: usuario.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].nombre === "moderator") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Requiere el rol de moderador!" });
        return;
      }
    );
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator
};
module.exports = authJwt;
