const mongoose = require("mongoose");

const Usuario = mongoose.model(
  "Usuario",
  new mongoose.Schema({
    usuario:{
      type: String,
      unique: true
    },
    email: String,
    clave: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Roles"
      }
    ]
  })
);

module.exports = Usuario;
