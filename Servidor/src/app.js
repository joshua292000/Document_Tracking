const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const config  = require('./config');
const cors = require('cors');

const casoRouters = require("./routes/caso.routes");
const departamentoRouters = require("./routes/departamento.routes");
const documentoRouters = require("./routes/documento.routes");
const organizacionRouters = require("./routes/organizacion.routes");
const parametroRouters = require("./routes/parametro.routes");
const permisoRouters = require("./routes/permiso.routes");
const rolesRouters = require("./routes/roles.routes");
const personaRouters = require("./routes/persona.routes");
const tramiteRouters = require("./routes/tramite.routes");
const usuarioRouters = require("./routes/usuario.routes");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(`/api/${config.API_VERSION}`, casoRouters);

app.use(`/api/${config.API_VERSION}`, departamentoRouters);

app.use(`/api/${config.API_VERSION}`, documentoRouters);

app.use(`/api/${config.API_VERSION}`, organizacionRouters);

app.use(`/api/${config.API_VERSION}`, parametroRouters);

app.use(`/api/${config.API_VERSION}`, permisoRouters);

app.use(`/api/${config.API_VERSION}`, rolesRouters);

app.use(`/api/${config.API_VERSION}`, personaRouters);

app.use(`/api/${config.API_VERSION}`, tramiteRouters);

app.use(`/api/${config.API_VERSION}`, usuarioRouters);


module.exports = app;