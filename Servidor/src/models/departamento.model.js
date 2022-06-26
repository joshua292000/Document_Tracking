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

    Contacto:
    {
        Correo: String,
        Telefono: Number
    },
    organizacion:{type: mongoose.Schema.Types.ObjectId,
                   ref: "Organizacion"}
  })
);
module.exports = Departamento;