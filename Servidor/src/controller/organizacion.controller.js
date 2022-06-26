const db = require("../models/");
const Organizacion = db.organizacion

async function registrar(req, res) {
    const organizacion = new Organizacion(req.body);

    await organizacion.save((err, organizacion) => {
        if (err) {
            res.status(500).send({ message: "La organizacion ya existe" });
        } else {
            if (!organizacion) {
                res.status(404).send({ message: "Error creandon el organizacion" });
            } else {
                res.status(200).send({ user: organizacion });
                console.log(organizacion);
            }
        }
    })
}

//----------------------------Mostrar todos las organizaciones---------------------------
async function findallorganizacion(req, res) {

    const organizacion = await Organizacion.find((err, userStored) => {
        if (err) {
            res.status(500).send({ message: "No existen organizaciones registrados" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error cargando las organizaciones" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    })
}
//----------------------------Mostrar organizacion por id-------------------------
async function findByIdorganizacion(req, res) {

    const organizacion = await Organizacion.findById(req.params.organizacionId, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "La organizacion consultada no existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error cargando la organizacion" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    })
}
//-----------------------------Actualizar organizacion--------------------------
async function actualizarorganizacion(req, res) {

    const organizacion= await Organizacion.findByIdAndUpdate(req.params.organizacionId, req.body, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "La organizacion a actualizar no existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error actualizando la organizacion" });
            } else {
                res.status(200).send({ status: 'Organizacion actualizada correctamente' });
            }
        }
    })


}

//------------------------------Eliminar Departamento------------------------------
async function eliminarorganizacion(req, res) {

    await Organizacion.findByIdAndDelete(req.params.organizacionId, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "La organizacion a eliminar no existe" });
        } else {
            res.status(200).send({ status: 'Organizacion eliminado' });
        }
    })


}
module.exports = {registrar, findallorganizacion, findByIdorganizacion, actualizarorganizacion, eliminarorganizacion};
