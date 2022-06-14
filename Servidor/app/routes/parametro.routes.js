const controller = require("../controllers/parametro.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/auth/crearparametro", controller.crearparametro);
    app.get("/api/auth/findallparametros", controller.findallparametros);

    app.get("/api/auth/findByIdparametro/:parametroId", controller.findByIdparametro);
    app.put("/api/auth/actualizarparametro/:parametroId", controller.actualizarparametro);
    app.delete("/api/auth/eliminarparametro/:parametroId", controller.eliminarparametro);
};