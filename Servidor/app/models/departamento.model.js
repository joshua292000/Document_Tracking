const mongoose = require("mongoose");

const Departamento = mongoose.model(
  "Departamento",
  new mongoose.Schema({
    Nombre: String,
    Descripcion: String,
    Jefe:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Persona"
    },
    Empleados:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Persona"
        }
    ],
    Contacto:
    {
        Correo: String,
        Telefono: Number
    }
  })
);
module.exports = Departamento;