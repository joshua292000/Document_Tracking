const controller = require("../controller/organizacion.controller");

const express = require("express");

const api = express.Router();
  api.post("/organizacion/registrar", controller.registrar);
  api.get("/api/organizacion/findallorganizacion", controller.findallorganizacion);
  api.get("/organizacion/findByName/:Nombre", controller.findByName);
  api.get("/organizacion/findByIdorganizacion/:organizacionId", controller.findByIdorganizacion);
  api.put("/organizacion/actualizarorganizacion/:organizacionId", controller.actualizarorganizacion);
  api.delete("/organizacion/eliminarorganizacion/:organizacionId", controller.eliminarorganizacion);

  module.exports = api;
