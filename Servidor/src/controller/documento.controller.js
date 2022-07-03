const db = require("../models");
const Documento = db.documento;

//--------------------------Crear documento------------------------------
async function registrardocumento(req, res) {
    const documento = new Documento (req.body);

    await documento .save((err, userStored) => {
        if (err) {
            console.log(userStored);
            res.status(500).send({ message: "El documento ya existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error creandon el documento" });
            } else {
                console.log(userStored);
                res.status(200).send({ user: userStored });
            }
        }
    }).clone().catch(function (err) { console.log(err) })
}
//----------------------------Mostrar todos los documento---------------------------
async function findalldocumento(req, res) {

    const documento = await Documento.find((err, userStored) => {
        if (err) {
            res.status(500).send({ message: "No existen documentos registrados" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error cargando los documentos" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    }).clone().catch(function (err) { console.log(err) })
}
//----------------------------Mostrar documento por id-------------------------
async function findByIddocumento(req, res) {

    const documento = await Documento.findById(req.params.documentoId, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "El documento consultado no existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error cargando el documento" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    }).clone().catch(function (err) { console.log(err) })
}
//-----------------------------Actualizar documento--------------------------
async function actualizardocumento(req, res) {

    const documento= await Documento.findByIdAndUpdate(req.params.documentoId, req.body, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "El documento a actualizar no existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error actualizando el documento" });
            } else {
                res.status(200).send({ status: 'Documento actualizado correctamente' });
            }
        }
    }).clone().catch(function (err) { console.log(err) })


}

//------------------------------Eliminar documento------------------------------
async function eliminardocumento(req, res) {

    await Documento.findByIdAndDelete(req.params.documentoId, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "El documento a eliminar no existe" });
        } else {
            res.status(200).send({ status: 'Documento eliminado' });
        }
    }).clone().catch(function (err) { console.log(err) })


}


//----------------------Busqueda por numero de caso----------------------------------
async function findByNumCaso(req, res) {

    await Documento.find({ Caso_id: req.params.id }, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "Los archios consultados no existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error cargando los archivos" });
            } else {

                if (userStored.length > 0) {

                    res.status(200).send({ user: userStored });

                } else {
                    res.status(500).send({ message: "Los archivos consultados no existe" });
                }

            }
        }
    }).clone().catch(function (err) { console.log(err) })
}
module.exports={registrardocumento, findalldocumento, findByIddocumento, actualizardocumento, eliminardocumento, findByNumCaso}