const mongoose = require("mongoose");

const Parametro = mongoose.model(
    "Parametro",
    new mongoose.Schema({
        identificacion:{
            type: String,
            unique: true
        },
        nombre: String,
        valor: String
    })
);

module.exports = Parametro;
