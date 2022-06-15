const mongoose = require("mongoose");
const db = require("../models/");
const Usuario = db.usuario

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
      Contacto:
          {
              Correo: String,
              Telefono: Number
          },
    usuario:[{
             
            type: mongoose.Schema.Types.ObjectId,          
            ref: "Usuario"
    }]
  })
);
module.exports = Persona;