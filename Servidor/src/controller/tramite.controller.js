const db = require("../models");
const Tramite = db.tramite;

//--------------------------Crear Tramite------------------------------

async function registrartramite(req, res) {
    const tramite = new Tramite(req.body);

    await tramite.save((err, userStored) => {
        if (err) {
            res.status(500).send({ message: "El tramite ya existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error registrando el tramite" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    })
}

//----------------------------Mostrar todos los trámites---------------------------
async function findalltramites(req, res) {

    const tramites = await Tramite.find((err, userStored) => {
        if (err) {
            res.status(500).send({ message: "No existen trámistes registrados" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error cargando los trámites" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    })
}
//----------------------------Mostrar trámite por id-------------------------
async function findByIdtramite(req, res) {

    const tramite = await Tramite.findById(req.params.tramiteId, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "El trámite consultado no existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error cargando el trámite" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    })
}
//-----------------------------Actualizar trámite--------------------------
async function actualizartramite(req, res) {

    const tramite= await Tramite.findByIdAndUpdate(req.params.tramiteId, req.body, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "El trámite a actualizar no existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error actualizando el trámite" });
            } else {
                res.status(200).send({ status: 'Trámite actualizado correctamente' });
            }
        }
    })


}

//------------------------------Eliminar trámite------------------------------
async function eliminartramite(req, res) {

    await Tramite.findByIdAndDelete(req.params.tramiteId, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "El trámite a eliminar no existe" });
        } else {
            res.status(200).send({ status: 'Trámite eliminado' });
        }
    })


}
module.exports = { registrartramite, findalltramites, findByIdtramite, actualizartramite, eliminartramite};