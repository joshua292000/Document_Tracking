const controller = require("../controller/usuario.controller");

const express = require("express");

const api = express.Router();

api.post("/usuario/registrarusuario", controller.registrarusuario);

api.get("/usuario/findByIdUsuario/:usuarioId", controller.findByIdUsuario);

api.get("/usuario/findByNameAndPassword/:nombre/:contrasena", controller.findByNameAndPassword);

api.put("/usuario/actualizarUsuario/:usuarioId", controller.actualizarUsuario);

api.get("/usuario/findByName/:Nombre", controller.findByName);

module.exports = api;
