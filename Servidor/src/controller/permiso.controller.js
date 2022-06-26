const db = require("../models");
const Permiso = db.permiso;

//--------------------------Crear Permisos------------------------------

async function crearpermiso(req, res) {
    const permiso = new Permiso(req.body);

    await permiso.save((err, userStored) => {
        if (err) {
            res.status(500).send({ message: "El permiso ya existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error creando el permiso" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    })
}
//----------------------------Mostrar todos los permisos---------------------------
async function findallpermisos(req, res) {

    const permisos = await Permiso.find((err, userStored) => {
        if (err) {
            res.status(500).send({ message: "No existen permisos registrados" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error cargando los permisos" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    })
}

//-----------------------------Mostrar permiso por id--------------------------
async function findByIdpermiso(req, res) {

    const permiso = await Permiso.findById(req.params.permisoId, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "El permiso consultado no existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error cargando el permiso" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    })
}

//-----------------------------Actualizar permisos--------------------------
async function actualizarpermiso(req, res) {

    const permiso = await Permiso.findByIdAndUpdate(req.params.permisoId, req.body, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "El permiso a actualizar no existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error actualizando el permiso" });
            } else {
                res.status(200).send({ status: 'Permiso actualizado correctamente' });
            }
        }
    })


}

//------------------------------Eliminar permisos------------------------------
async function eliminarpermiso(req, res) {

    await Permiso.findByIdAndDelete(req.params.permisoId, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "El permiso a eliminar no existe" });
        } else {
            res.status(200).send({ status: 'Permiso eliminado' });
        }
    })


}
module.exports = { crearpermiso, findallpermisos, findByIdpermiso, actualizarpermiso, eliminarpermiso };