const db = require("../models");
const Parametro = db.parametro;

//--------------------------Crear Parámetro------------------------------
async function crearparametro(req, res) {
    const parametro = new Parametro(req.body);

    await parametro.save((err, userStored) => {
        if (err) {
            res.status(500).send({ message: "El parámetro ya existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error creando el parámetro" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    })
}
//----------------------------Mostrar todos los parámetros---------------------------
async function findallparametros(req, res) {

    const parametros = await Parametro.find((err, userStored) => {
        if (err) {
            res.status(500).send({ message: "No existen parámetros registrados" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error cargando los parámetros" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    })
}
//-----------------------------Mostrar parámetro por id------------------------
async function findByIdparametro(req, res) {

    const parametro = await Parametro.findById(req.params.parametroId, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "El parámetro consultado no existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error cargando el parámetro" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    })
}
//-----------------------------Actualizar parámetros--------------------------
async function actualizarparametro(req, res) {

    const parametro = await Parametro.findByIdAndUpdate(req.params.parametroId, req.body, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "El parámetro a actualizar no existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error actualizando el parámetro" });
            } else {
                res.status(200).send({ status: 'Parámetro actualizado correctamente' });
            }
        }
    })
}

//------------------------------Eliminar parámetro------------------------------
async function eliminarparametro(req, res) {

    await Parametro.findByIdAndDelete(req.params.parametroId, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "El parámetro a eliminar no existe" });
        } else {
            res.status(200).send({ status: 'Parámetro eliminado' });
        }
    })
}
module.exports = { crearparametro, findallparametros, findByIdparametro, actualizarparametro, eliminarparametro };