const db = require("../models");
const Parametro = db.parametro;

//--------------------------Crear Par�metro------------------------------
async function crearparametro(req, res) {
    const parametro = new Parametro(req.body);

    await parametro.save((err, userStored) => {
        if (err) {
            res.status(500).send({ message: "El par�metro ya existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error creando el par�metro" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    }).clone().catch(function (err) { console.log(err) })
}
//----------------------------Mostrar todos los par�metros---------------------------
async function findallparametros(req, res) {

    const parametros = await Parametro.find((err, userStored) => {
        if (err) {
            res.status(500).send({ message: "No existen par�metros registrados" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error cargando los par�metros" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    }).clone().catch(function (err) { console.log(err) })
}
//-----------------------------Mostrar par�metro por id------------------------
async function findByIdparametro(req, res) {

    const parametro = await Parametro.findById(req.params.parametroId, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "El par�metro consultado no existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error cargando el par�metro" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    }).clone().catch(function (err) { console.log(err) })
}
//-----------------------------Actualizar par�metros--------------------------
async function actualizarparametro(req, res) {

    const parametro = await Parametro.findByIdAndUpdate(req.params.parametroId, req.body, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "El par�metro a actualizar no existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error actualizando el par�metro" });
            } else {
                res.status(200).send({ status: 'Par�metro actualizado correctamente' });
            }
        }
    }).clone().catch(function (err) { console.log(err) })
}

//------------------------------Eliminar par�metro------------------------------
async function eliminarparametro(req, res) {

    await Parametro.findByIdAndDelete(req.params.parametroId, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "El par�metro a eliminar no existe" });
        } else {
            res.status(200).send({ status: 'Par�metro eliminado' });
        }
    }).clone().catch(function (err) { console.log(err) })
}
module.exports = { crearparametro, findallparametros, findByIdparametro, actualizarparametro, eliminarparametro };