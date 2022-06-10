const mongoose = require("mongoose");

const Permiso = mongoose.model(
    "Permiso",
    new mongoose.Schema({
        nombre: String,
        descripcion: String
    })
);

module.exports = Permiso;
