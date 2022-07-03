const controller = require("../controller/persona.controller");

const express = require("express");

const api = express.Router();

api.post("/persona/crearpersona", controller.registrarpersona);

api.get("/persona/findallpersona", controller.findallpersona);

api.get("/persona/findbyidpersona/:personaId", controller.findbyidpersona);

api.get("/persona/getAllByIdDepartamento/:id", controller.getAllByIdDepartamento);


api.put("/persona/actualizarpersona/:personaId", controller.actualizarpersona);

api.delete("/persona/eliminarpersona/:personaId", controller.eliminarpersona);

  
module.exports = api;