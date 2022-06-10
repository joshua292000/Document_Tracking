const mongoose = require("mongoose");

const Parametro = mongoose.model(
    "Parametro",
    new mongoose.Schema({
        valor: Number
    })
);

module.exports = Parametro;
