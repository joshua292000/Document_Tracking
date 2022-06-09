const config = require("../config/auth.config");
const db = require("../models");
const Usuario = db.usuario;
const Roles = db.roles;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

//----------------------------------------------Registrarse------------------------------------------
exports.signup = (req, res) => {
  const usuario = new Usuario({
    usuario: req.body.usuario,
    email: req.body.email,
    clave: bcrypt.hashSync(req.body.clave, 8)
  });

  usuario.save((err, usuario) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Roles.find(
        {
          nombre: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          usuario.roles = roles.map(roles => roles._id);
          usuario.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "El usuario se registró correctamente!" });
          });
        }
      );
    } else {
      Roles.findOne({ nombre: "user" }, (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        usuario.roles = [roles._id];
        usuario.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "El usuario se registró correctamente!" });
        });
      });
    }
  });
};

//---------------------------------------------Iniciar sesion------------------------------------------------
exports.signin = (req, res) => {
  Usuario.findOne({
    usuario: req.body.usuario
  })
    .populate("roles", "-__v")
    .exec((err, usuario) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!usuario) {
        return res.status(404).send({ message: "Usuario no encontrado." });
      }

      var claveValida = bcrypt.compareSync(
        req.body.clave,
        usuario.clave
      );

      if (!claveValida) {
        return res.status(401).send({
          accessToken: null,
          message: "Clave invalida!"
        });
      }

      var token = jwt.sign({ id: usuario.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < usuario.roles.length; i++) {
        authorities.push("ROLES_" + usuario.roles[i].nombre.toUpperCase());
      }
      res.status(200).send({
        id: usuario._id,
        usuario: usuario.usuario,
        email: usuario.email,
        roles: authorities,
        accessToken: token
      });
    });
};
