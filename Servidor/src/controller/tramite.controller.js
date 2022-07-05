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

//----------------------------Mostrar todos los tr�mites---------------------------
async function findalltramites(req, res) {

    const tramites = await Tramite.find((err, userStored) => {
        if (err) {
            res.status(500).send({ message: "No existen tr�mistes registrados" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error cargando los tr�mites" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    }).clone().catch(function (err) { console.log(err) })
}
//----------------------------Mostrar tr�mite por id-------------------------
async function findByIdtramite(req, res) {

    const tramite = await Tramite.findById(req.params.tramiteId, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "El tr�mite consultado no existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error cargando el tr�mite" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    }).clone().catch(function (err) { console.log(err) })
}
//-----------------------------Actualizar tr�mite--------------------------
async function actualizartramite(req, res) {

    const tramite= await Tramite.findByIdAndUpdate(req.params.tramiteId, req.body, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "El tr�mite a actualizar no existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error actualizando el tr�mite" });
            } else {
                res.status(200).send({ status: 'Tr�mite actualizado correctamente' });
            }
        }
    }).clone().catch(function (err) { console.log(err) })


}

//------------------------------Eliminar tr�mite------------------------------
async function eliminartramite(req, res) {

    await Tramite.findByIdAndDelete(req.params.tramiteId, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "El tr�mite a eliminar no existe" });
        } else {
            res.status(200).send({ status: 'Tr�mite eliminado' });
        }
    }).clone().catch(function (err) { console.log(err) })


}

//------------------------------Busqueda por id de organizacion------------------------------
async function findByIdOrg(req, res) {

    const tramite = await Tramite.find({organizacion_id: req.params.id }, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "No existen tramites registrados" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error cargando los tramites" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    }).clone().catch(function (err) { console.log(err) })
}


//------------------------------Busqueda por id de departamento------------------------------
async function getByIdDep(req, res) {

    await Tramite.find({ id_departamento: req.params.id }, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "No existen departamentos registrados" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error cargando los departamentos" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    }).clone().catch(function (err) { console.log(err) })
}

//-----------------------------Mostrar Organizacion por nombre--------------------------
async function findByName(req, res) {

    const organizacion = await Tramite.find({nombre: req.params.Nombre}, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "La organizacion consultada no existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error cargando la organizacion" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    }).clone().catch(function (err) { console.log(err) })
  
}
module.exports = { registrartramite, findalltramites, findByIdtramite, actualizartramite, eliminartramite, findByIdOrg, getByIdDep,findByName};