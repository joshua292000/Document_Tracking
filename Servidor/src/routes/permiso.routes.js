const controller = require("../controller/permiso.controller");

const express = require("express");

const api = express.Router();
api.post("/permiso/crearpermiso", controller.crearpermiso);
api.get("/permiso/findallpermisos", controller.findallpermisos);

api.get("/permiso/findByIdpermiso/:permisoId", controller.findByIdpermiso);
api.put("/permiso/actualizarpermiso/:permisoId", controller.actualizarpermiso);
api.delete("/permiso/eliminarpermiso/:permisoId", controller.eliminarpermiso);

module.exports = api;