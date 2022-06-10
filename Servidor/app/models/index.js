const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.usuario = require("./usuario.model");
db.roles = require("./roles.model");
db.persona = require("./persona.model");
db.deprtamento = require("./departamento.model");
db.caso = require("./caso.model");
db.ROLES = ["user", "admin", "moderator"];

module.exports = db;