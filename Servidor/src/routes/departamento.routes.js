const controller = require("../controller/departamento.controller");
const express = require("express");

const api = express.Router();

  api.post("/departamento/creardepartamento", controller.registrardepartamento);
  api.get("/departamento/findalldepartamento", controller.findalldepartamento);

  api.get("/departamento/findByIddepartamento/:departamentoId", controller.findByIddepartamento);
  api.put("/departamento/actualizardepartamento/:departamentoId", controller.actualizardepartamento);
  api.delete("/departamento/eliminardepartamento/:departamentoId", controller.eliminardepartamento);

  api.get("/departamento/findByName/:Nombre", controller.findByName);

  api.get("/departamento/getByIdOrg/:id", controller.getByIdOrg);

module.exports = api;