const controller = require("../controllers/tramite.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/auth/registrartramite", controller.registrartramite);
    app.get("/api/auth/findalltramites", controller.findalltramites);

    app.get("/api/auth/findByIdtramite/:tramiteId", controller.findByIdtramite);
    app.put("/api/auth/actualizartramite/:tramiteId", controller.actualizartramite);
    app.delete("/api/auth/eliminartramite/:tramiteId", controller.eliminartramite);
};