const mongoose = require("mongoose");

const Caso = mongoose.model(
  "Caso",
  new mongoose.Schema({
     NumeroCaso:String,
     FechaInicio: Date,
     FechaFin: Date,
     Estado: String,
     CasosXDepartamento:[{
        Departamento:
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Departamento",
          FechaInicio: Date,
          FechaFin: Date

        }
     }]
  })
);
module.exports = Caso;