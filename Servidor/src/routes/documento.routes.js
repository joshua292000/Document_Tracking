const controller = require("../controller/documento.controller");

const express = require("express");

const api = express.Router();

  api.post("/documento/registrardocumento", controller.registrardocumento);
  api.get("/api/documento/findalldocumento", controller.findalldocumento);

  api.get("/documento/findByIddocumento/:documentoId", controller.findByIddocumento);
  api.put("/documentoactualizardocumento/:documentoId", controller.actualizardocumento);
  api.delete("/documento/eliminardocumento/:documentoId", controller.eliminardocumento);

module.exports = api;