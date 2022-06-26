const controller = require("../controller/caso.controller");

const express = require("express");

const api = express.Router();

  

    api.post("/caso/registrarcaso", controller.registrarcaso);
    api.get("/caso/findallcaso", controller.findallcaso);

    api.get("/caso/findByIdcaso/:casoId", controller.findByIdcaso);
    api.put("/caso/actualizarcaso/:casoId", controller.actualizarcaso);
    api.delete("/caso/eliminarcaso/:casoId", controller.eliminarcaso);

module.exports = api;