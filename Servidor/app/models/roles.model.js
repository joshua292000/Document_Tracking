const mongoose = require("mongoose");

const Roles = mongoose.model(
  "Roles",
  new mongoose.Schema({
    nombre: String,
    descripcion: String
  })
);

module.exports = Roles;
