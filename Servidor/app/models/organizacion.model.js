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
    Departamentos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Departamento"
      }
    ],
    Empleados: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Persona"
      }
    ]

  })
);

module.exports = Organizacion;