const db = require("../models");
const Caso = db.caso;

//--------------------------Crear Caso------------------------------
async function registrarcaso(req, res) {
    const caso = new Caso (req.body);

    await caso.save((err, userStored) => {
        if (err) {
            console.log(userStored);
            res.status(500).send({ message: "El caso ya existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error creandon el caso" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    })
}

//----------------------------Mostrar todos los Caso---------------------------
async function findallcaso(req, res) {

    const caso = await Caso.find((err, userStored) => {
        if (err) {
            res.status(500).send({ message: "No existen casos registrados" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error cargando los casos" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    })
}
//----------------------------Mostrar caso por id-------------------------
async function findByIdcaso(req, res) {

    const caso = await Caso.findById(req.params.casoId, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "EL caso consultada no existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error cargando el caso" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    })
}
//-----------------------------Actualizar caso--------------------------
async function actualizarcaso(req, res) {

    const caso= await Caso.findByIdAndUpdate(req.params.casoId, req.body, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "EL caso a actualizar no existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error actualizando el caso" });
            } else {
                res.status(200).send({ status: 'Caso actualizado correctamente' });
            }
        }
    })


}

//------------------------------Eliminar caso------------------------------
async function eliminarcaso(req, res) {

    await Caso.findByIdAndDelete(req.params.casoId, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "EL caso a eliminar no existe" });
        } else {
            res.status(200).send({ status: 'Caso eliminado' });
        }
    })


}
module.exports={registrarcaso,findallcaso,findByIdcaso,actualizarcaso,eliminarcaso};
