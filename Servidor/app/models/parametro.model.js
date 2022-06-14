const mongoose = require("mongoose");

const Parametro = mongoose.model(
    "Parametro",
    new mongoose.Schema({
        nombre: String,
        valor: String
    })
);

module.exports = Parametro;
