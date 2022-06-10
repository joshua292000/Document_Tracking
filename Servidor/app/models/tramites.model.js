const mongoose = require("mongoose");

const Tramite = mongoose.model(
    "Tramite",
    new mongoose.Schema({
        nombre: String,
        depaActual: String,
        ciclo: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Departamento"
            }
        ],
        documentos: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Documento"
            }
        ],
        casos: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Caso"
            }
        ]
    })
);

module.exports = Tramite;
