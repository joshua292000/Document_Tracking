const db = require("../models");
const Departamento = db.departamento;

//--------------------------Crear Permisos------------------------------
async function registrardepartamento(req, res) {
    const departamento = new Departamento (req.body);

    await departamento .save((err, userStored) => {
        if (err) {
            console.log(userStored);
            res.status(500).send({ message: "El departamento ya existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error creandon el departamento" });
            } else {
                console.log(userStored);
                res.status(200).send({ user: userStored });
            }
        }
    })
}
module.exports={registrardepartamento};