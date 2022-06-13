const mongoose = require("mongoose");

const Roles = mongoose.model(
  "Roles",
  new mongoose.Schema({
    nombre: String,
    descripcion: String,
    permiso: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Permiso"
        }
      ]
  })
);

module.exports = Roles;
