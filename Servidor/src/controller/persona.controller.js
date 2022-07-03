const db = require("../models");
const Persona = db.persona;

//--------------------------Crear Persona-------------------------------
async function registrarpersona(req, res) {
    const persona = new Persona (req.body);

    await persona.save((err, persona) => {
        if (err) {
            console.log(persona);
            res.status(500).send({ message: "La persona ya existe" });
        } else {
            if (!persona) {
                res.status(404).send({ message: "Error creando la persona" });
            } else {
                
                  res.status(200).send({ user: persona });
            }
        }
    }).clone().catch(function (err) { console.log(err) })
}

//----------------------------Mostrar todas las personas---------------------------
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
    }).clone().catch(function (err) { console.log(err) })
}
//----------------------------Mostrar persona por id-------------------------
async function findbyidpersona(req, res) {

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
    }).clone().catch(function (err) { console.log(err) })
}

/*async function findbyIdentypersona(req, res) {

    const persona = await Persona.findOne({Nombre: new RegExp('^'+req.params.personaIdenty+'$', "i")}, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "La persona consultada no existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error cargando la persona" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    }).clone().catch(function (err) { console.log(err) })
}*/
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
    }).clone().catch(function (err) { console.log(err) })


}

//------------------------------Eliminar persona------------------------------
async function eliminarpersona(req, res) {

    await Persona.findByIdAndDelete(req.params.personaId, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "La persona a eliminar no existe" });
        } else {
            res.status(200).send({ status: 'Persona eliminada' });
        }
    }).clone().catch(function (err) { console.log(err) })


}

//---------------Obtienen todos los empleados de un departamento------------------------
async function getAllByIdDepartamento(req, res) {

    await Persona.find({ departamento_id: req.params.id }, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "El usuario consultado no existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error cargando los usuarios" });
            } else {

                if (userStored.length > 0) {

                    res.status(200).send({ user: userStored });

                } else {
                    res.status(500).send({ message: "El usuario consultado no existe" });
                }

            }
        }
    }).clone().catch(function (err) { console.log(err) })
}

module.exports={registrarpersona,findallpersona,findbyidpersona,actualizarpersona,eliminarpersona,getAllByIdDepartamento};
