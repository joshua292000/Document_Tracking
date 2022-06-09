const db = require("../models");
const ROLES = db.ROLES;
const Usuario = db.usuario;

RevisarDuplicadosUsuarioUEmail = (req, res, next) => {
  // Usuario
  Usuario.findOne({
    usuario: req.body.usuario
  }).exec((err, usuario) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (usuario) {
      res.status(400).send({ message: "Error! El nombre de usuario ya está en uso" });
      return;
    }

    // Email
    Usuario.findOne({
      email: req.body.email
    }).exec((err, usuario) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (usuario) {
        res.status(400).send({ message: "Error! El correo de usuario ya está en uso" });
        return;
      }

      next();
    });
  });
};

RevisarRolesExistentes = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Error! El Rol ${req.body.roles[i]} no existe!`
        });
        return;
      }
    }
  }

  next();
};

const verificarRegistrar = {
  RevisarDuplicadosUsuarioUEmail,
  RevisarRolesExistentes
};

module.exports = verificarRegistrar;
