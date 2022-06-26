const controller = require("../controller/parametro.controller");

const express = require("express");

const api = express.Router();

api.post("/parametro/crearparametro", controller.crearparametro);
api.get("/parametro/findallparametros", controller.findallparametros);

api.get("/parametro/findByIdparametro/:parametroId", controller.findByIdparametro);
api.put("/parametro/actualizarparametro/:parametroId", controller.actualizarparametro);
api.delete("/parametro/eliminarparametro/:parametroId", controller.eliminarparametro);

module.exports = api;