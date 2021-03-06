const db = require("../models");
const Departamento = db.departamento;

//--------------------------Crear Departamento------------------------------
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
//----------------------------Mostrar todos los Departamento---------------------------
async function findalldepartamento(req, res) {

    const departamento = await Departamento.find((err, userStored) => {
        if (err) {
            res.status(500).send({ message: "No existen departamentos registrados" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error cargando los departamento" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    }).clone().catch(function (err) { console.log(err) })
}
//----------------------------Mostrar Departamento por id-------------------------
async function findByIddepartamento(req, res) {

    const departamento = await Departamento.findById(req.params.departamentoId, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "El departamento consultado no existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error cargando el departamento" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    }).clone().catch(function (err) { console.log(err) })
}
//-----------------------------Actualizar Departamento--------------------------
async function actualizardepartamento(req, res) {

    const departamento= await Departamento.findByIdAndUpdate(req.params.departamentoId, req.body, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "El departamento a actualizar no existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error actualizando el departamento" });
            } else {
                res.status(200).send({ status: 'Departamento actualizado correctamente' });
            }
        }
    }).clone().catch(function (err) { console.log(err) })


}

//------------------------------Eliminar Departamento------------------------------
async function eliminardepartamento(req, res) {

    await Departamento.findByIdAndDelete(req.params.departamentoId, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "El departamento a eliminar no existe" });
        } else {
            res.status(200).send({ status: 'Departamento eliminado' });
        }
    }).clone().catch(function (err) { console.log(err) })


}

//-----------------------------Mostrar departamento por nombre--------------------------
async function findByName(req, res) {

    const departamento = await Departamento.find({Nombre: req.params.Nombre}, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "El departamento consultado no existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error cargando el departamento" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    }).clone().catch(function (err) { console.log(err) })
  
}

//-------------------Mostrar departamentos por organizacion------------------------------
async function getByIdOrg(req, res) {

    await Departamento.find({ organizacion_id: req.params.id }, (err, userStored) => {
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

module.exports={registrardepartamento,findalldepartamento,findByIddepartamento,actualizardepartamento,eliminardepartamento, findByName, getByIdOrg};