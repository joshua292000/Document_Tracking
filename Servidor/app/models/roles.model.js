const mongoose = require("mongoose");

const Roles = mongoose.model(
  "Roles",
  new mongoose.Schema({
    nombre: String
  })
);

module.exports = Roles;
