const mongoose = require("mongoose");
const db = require("../models/");


const Persona = mongoose.model(
  "Persona",
  new mongoose.Schema({
      Identificacion: {
      type: String,
      unique: true
      },
      Nombre: String,
      PApellido: String,
      SApellido: String,
      FecNaci: Date,
      Edad: Number,
      Nacionalidad: String,
      direccion: String,
      Correo: String,
      Telefono: Number,
    rol:{        
            type: mongoose.Schema.Types.ObjectId,          
            ref: "Roles"
    },
    departamento_id:{type: mongoose.Schema.Types.ObjectId,          
                   ref: "Departamento"}
  })
);
module.exports = Persona;