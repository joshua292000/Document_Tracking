const mongoose = require("mongoose");

const Departamento = mongoose.model(
  "Departamento",
  new mongoose.Schema({
    Identificacion:{
      type: String,
      unique: true
    },
    Nombre: String,
    Descripcion: String,
    Jefe:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Persona"
    },

        Correo: String,
        Telefono: Number,
         
    organizacion_id: String
  })
);
module.exports = Departamento;