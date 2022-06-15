const db = require("../models");
const Persona = db.persona;

//--------------------------Crear Persona------------------------------
async function registrarpersona(req, res) {
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

//----------------------------Mostrar todos las personas---------------------------
async function findallpersona(req, res) {

    const persona = await Persona.find((err, userStored) => {
        if (err) {
            res.status(500).send({ message: "No existen personas registradas" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error cargando las personas" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    })
}
//----------------------------Mostrar persona por id-------------------------
async function findByIdpersona(req, res) {

    const persona = await Persona.findById(req.params.personaId, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "La persona consultada no existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error cargando la persona" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    })
}
//-----------------------------Actualizar persona--------------------------
async function actualizarpersona(req, res) {

    const persona= await Persona.findByIdAndUpdate(req.params.personaId, req.body, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "La persona a actualizar no existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error actualizando la persona" });
            } else {
                res.status(200).send({ status: 'Persona actualizada correctamente' });
            }
        }
    })


}

//------------------------------Eliminar persona------------------------------
async function eliminarpersona(req, res) {

    await Persona.findByIdAndDelete(req.params.personaId, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "La persona a eliminar no existe" });
        } else {
            res.status(200).send({ status: 'Persona eliminada' });
        }
    })


}
module.exports={registrarpersona,findallpersona,findByIdpersona,actualizarpersona,eliminarpersona};
