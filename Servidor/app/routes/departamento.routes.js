const controller = require("../controllers/departamento.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/auth/creardepartamento", controller.registrardepartamento);
  app.get("/api/auth/findalldepartamento", controller.findalldepartamento);

  app.get("/api/auth/findByIddepartamento/:departamentoId", controller.findByIddepartamento);
  app.put("/api/auth/actualizardepartamento/:departamentoId", controller.actualizardepartamento);
  app.delete("/api/auth/eliminardepartamento/:departamentoId", controller.eliminardepartamento);
};