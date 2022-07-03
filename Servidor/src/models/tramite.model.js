const mongoose = require("mongoose");

const Tramite = mongoose.model(
    "Tramite",
    new mongoose.Schema({
        Identificacion: {
            type: String,
            unique: true
        },
        organizacion_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organizacion"
        },
        nombre: String,
        descripcion: String,
        depaActual: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Departamento"
        },
        ciclo: [
            {
                id_departamento: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Departamento"
                },   
                estado: Boolean
            }
        ],
        documentos: [
            {
                nombre_doc: String,
                descripcion_doc: String,
                estado_doc: Boolean,
                tipo_doc: String
            }
        ]
    })
);

module.exports = Tramite;
