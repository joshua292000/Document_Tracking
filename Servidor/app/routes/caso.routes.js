const controller = require("../controllers/caso.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/auth/registrarcaso", controller.registrarcaso);
    app.get("/api/auth/findallcaso", controller.findallcaso);

    app.get("/api/auth/findByIdcaso/:casoId", controller.findByIdcaso);
    app.put("/api/auth/actualizarcaso/:casoId", controller.actualizarcaso);
    app.delete("/api/auth/eliminarcaso/:casoId", controller.eliminarcaso);
};