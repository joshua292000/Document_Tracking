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
    Descripcion: String
    
  })
);

module.exports = Documento;