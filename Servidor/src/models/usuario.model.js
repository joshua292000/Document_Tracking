const mongoose = require("mongoose");

const Usuario = mongoose.model(
  "Usuario",
  new mongoose.Schema({
    nombre_usuario:{
      type: String,
      unique: true
    },
    contrasena: String,
    organizacion:{type: mongoose.Schema.Types.ObjectId,
                  ref: "Organizacion"}
  })
);


module.exports = Usuario;
