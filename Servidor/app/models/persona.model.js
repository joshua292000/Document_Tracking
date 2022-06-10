const mongoose = require("mongoose");

const Persona = mongoose.model(
  "Persona",
  new mongoose.Schema({
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
          }
  })
);
module.exports = Persona;