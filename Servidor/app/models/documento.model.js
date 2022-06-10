const mongoose = require("mongoose");

const Documento = mongoose.model(
  "Documento",
  new mongoose.Schema({
    Nombre: String,
    Anexo: String,
    Tipo: String,
    Descripcion: String,
    DocumentoXTramite: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tramite"
      }
    
    
  })
);

module.exports = Documento;