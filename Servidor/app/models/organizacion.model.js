const mongoose = require("mongoose");

const Organizacion = mongoose.model(
  "Organizacion",
  new mongoose.Schema({
    Nombre: String,
    Fecha_Creacion: Date,
    Tipo: String,
   /* documentos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Documentos"
      }
    ]
    
    persona: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Persona"
      }
    ]

    */
  })
);

module.exports = Organizacion;