const controller = require("../controller/roles.controller");

const express = require("express");

const api = express.Router();

api.post("/roles/crearRol", controller.crearRol);

api.get("/roles/findallroles", controller.findallroles);

api.get("/roles/findByIdrol/:rolesId", controller.findByIdrol);

api.get("/roles/findByName/:nombre", controller.findByName);

api.put("/roles/actualizarRol/:rolesId", controller.actualizarRol);

api.delete("/roles/eliminarRol/:rolesId", controller.eliminarRol);
  
module.exports = api;
