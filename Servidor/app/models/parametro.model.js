const mongoose = require("mongoose");

const Parametro = mongoose.model(
    "Parametro",
    new mongoose.Schema({
        valor: String
    })
);

module.exports = Parametro;
