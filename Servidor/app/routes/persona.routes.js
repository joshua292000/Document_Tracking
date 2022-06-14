const controller = require("../controllers/persona.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/auth/crearpersona", controller.registrarpersona);
  app.get("/api/auth/findallpersona", controller.findallpersona);

  app.get("/api/auth/findByIdpersona/:personaId", controller.findByIdpersona);
  app.put("/api/auth/actualizarpersona/:personaId", controller.actualizarpersona);
  app.delete("/api/auth/eliminarpersona/:personaId", controller.eliminarpersona);

  
};