const mongoose = require("mongoose");

const Caso = mongoose.model(
  "Caso",
  new mongoose.Schema({
     NombreCaso: String,
     NumeroCaso:{
        type: String,
        unique: true
     },
     Tramite_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tramite",
     },
     Organizacion_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organizacion",
     },
     FechaInicio: Date,
     FechaFin: Date,
     Estado: Boolean,
    CasosXDepartamento: [{
          FechaIniciod: Date,
          FechaFind: Date,
          Departamento: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Departamento",
          }   
     }]
  })
);
module.exports = Caso; 