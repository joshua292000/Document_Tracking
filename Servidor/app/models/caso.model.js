const mongoose = require("mongoose");

const Caso = mongoose.model(
  "Caso",
  new mongoose.Schema({
     NumeroCaso:{
                  type: String,
                  unique: true
     },
     FechaInicio: Date,
     FechaFin: Date,
     Estado: String,
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