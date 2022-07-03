const mongoose = require("mongoose");

const Documento = mongoose.model(
  "Documento",
  new mongoose.Schema({
    Identificacion:{
      type: String,
      unique: true
    },
    Nombre: String,
    Anexo: String,
    Tipo: String,
    Estado: Boolean,
    Tramite_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tramite",
    },
    Caso_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Caso",
    },
    
  })
);

module.exports = Documento;