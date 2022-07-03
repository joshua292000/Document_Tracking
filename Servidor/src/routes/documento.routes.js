const controller = require("../controller/documento.controller");

const express = require("express");

const api = express.Router();

  api.post("/documento/registrardocumento", controller.registrardocumento);
  api.get("/documento/findalldocumento", controller.findalldocumento);

  api.get("/documento/findByIddocumento/:documentoId", controller.findByIddocumento);
  api.put("/documento/actualizardocumento/:documentoId", controller.actualizardocumento);
  api.delete("/documento/eliminardocumento/:documentoId", controller.eliminardocumento);

  api.get("/documento/findByNumCaso/:id", controller.findByNumCaso);

module.exports = api;