const mongoose = require("mongoose");

const Permiso = mongoose.model(
    "Permiso",
    new mongoose.Schema({
        identificacion: {
            type: String,
            unique: true
        },
        nombre: String,
        descripcion: String
    })
);

module.exports = Permiso;
