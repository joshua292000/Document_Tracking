const db = require("../models/");
const Organizacion = db.organizacion

async function registrar(req, res) {
    const organizacion = new Organizacion(req.body);

    await organizacion.save((err, organizacion) => {
        if (err) {
            res.status(500).send({ message: "El usuario ya existe" });
        } else {
            if (!organizacion) {
                res.status(404).send({ message: "Error creandon el usuario" });
            } else {
                res.status(200).send({ user: organizacion });
                console.log(organizacion);
            }
        }
    })
}
module.exports = {registrar};
