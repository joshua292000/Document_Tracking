const mongoose = require("mongoose");

const Organizacion = mongoose.model(
  "Organizacion",
  new mongoose.Schema({
    Identificacion:{
      type: String,
      unique: true
    },
    Nombre: String,
    Fecha_Creacion: Date,
    Tipo: String,
    Correo: String
  })
);

module.exports = Organizacion;