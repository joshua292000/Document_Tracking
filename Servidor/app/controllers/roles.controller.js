const db = require("../models");
const Permiso = db.permiso;
const Roles = db.roles;


//----------------------------------------------Crear rol------------------------------------------
exports.crearrol = (req, res) => {
  const roles = new Roles({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
  });

  roles.save((err, roles) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.permiso) {
      Permiso.find(
        {
          nombre: { $in: req.body.permiso }
        },
        (err, permiso) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          roles.permiso = permiso.map(permiso => permiso._id);
          roles.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "El rol se registró correctamente!" });
          });
        }
      );
    } 
  });
};