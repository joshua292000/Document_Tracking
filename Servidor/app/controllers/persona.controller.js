const db = require("../models");
const Persona = db.persona;

//--------------------------Crear Permisos------------------------------
async function registrar(req, res) {
    const persona = new Persona (req.body);

    await persona .save((err, userStored) => {
        if (err) {
            console.log(userStored);
            res.status(500).send({ message: "El usuario ya existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error creandon el usuario" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    })
}
module.exports={registrar};
/*exports.crearpersona = (req, res) =>{
    const persona = new Persona({
        Nombre: req.body.Nombre,
        PApellido: req.body.PApellido,
        SApellido: req.body.SApellido,
        FecNaci: req.body.FecNaci,
        Edad: req.body.Edad,
        Nacionalidad: req.body.Nacionalidad,
        direccion: req.body.direccion,
        Contacto: 
            {
                Correo: req.body.Correo,
                Telefono: req.body.Telefono
            }
    });

    persona.save((err, persona) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.send({ message: "La persona se registró correctamente!" });
} );
};*/