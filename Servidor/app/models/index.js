const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.usuario = require("./usuario.model");
db.roles = require("./roles.model");
db.organizacion = require("./organizacion.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;