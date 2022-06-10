const mongoose = require("mongoose");

const Roles = mongoose.model(
  "Roles",
  new mongoose.Schema({
    nombre: String,
    descripcion: String,
    rolXPermiso: 
        {
            //type: mongoose.Schema.Types.ObjectId,
            
            nombreP: String,
            ref: "Permiso"
        }
    
  })
);

module.exports = Roles;
