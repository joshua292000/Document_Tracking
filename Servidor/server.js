const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Roles = db.roles;
const Usuario = db.usuario;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Conexion establecida correctamente a MongoDB.");
    initial();
   
  })
  .catch(err => {
    console.error("Error de conexion", err);
    process.exit();
  });


app.get("/", (req, res) => {
  res.json({ message: "Bienvenidos a la apliacion del Laboratorio." });
});


require("./app/routes/auth.routes")(app);
require("./app/routes/usuario.routes")(app);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}.`);
});

//-------------------------------Se añaden roles------------------------------------------------
function initial() {
  Roles.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Roles({
        nombre: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("Añadido 'user' a la colección de roles");
      });

      new Roles({
        nombre: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("Añadido 'moderator' a la colección de roles");
      });

      new Roles({
        nombre: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("Añadido 'admin' a la colección de roles");
      });
    }
  });
}


