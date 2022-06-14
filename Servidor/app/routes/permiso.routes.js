const controller = require("../controllers/permiso.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

    app.post("/api/auth/crearpermiso", controller.crearpermiso);
    app.get("/api/auth/findallpermisos", controller.findallpermisos);

    app.get("/api/auth/findByIdpermiso/:permisoId", controller.findByIdpermiso);
    app.put("/api/auth/actualizarpermiso/:permisoId", controller.actualizarpermiso);
    app.delete("/api/auth/eliminarpermiso/:permisoId", controller.eliminarpermiso);
};