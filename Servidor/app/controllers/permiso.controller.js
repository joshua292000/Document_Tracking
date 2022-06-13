const db = require("../models");
const Permiso = db.permiso;

//--------------------------Crear Permisos------------------------------

exports.crearpermiso = (req, res) =>{
    const permiso = new Permiso({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion
    });

    permiso.save((err, permiso) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.send({ message: "El permiso se registró correctamente!" });
} );
};