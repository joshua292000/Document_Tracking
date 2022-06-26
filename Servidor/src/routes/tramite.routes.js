const controller = require("../controller/tramite.controller");

const express = require("express");

const api = express.Router();
api.post("/tramite/registrartramite", controller.registrartramite);

api.get("/tramite/findalltramites", controller.findalltramites);

api.get("/tramite/findByIdtramite/:tramiteId", controller.findByIdtramite);

api.put("/tramite/actualizartramite/:tramiteId", controller.actualizartramite);

api.delete("/tramite/eliminartramite/:tramiteId", controller.eliminartramite);

module.exports = api;