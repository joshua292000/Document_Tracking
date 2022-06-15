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
const Persona = db.persona;
const Organizacion = db.organizacion;
const Documento = db.documento;
const Caso = db.caso;
const Departamento = db.departamento;
const Parametro = db.parametro;
const Permiso = db.permiso;
const Tramite = db.tramite;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Conexion establecida correctamente a MongoDB.");
    ingresarPermiso();
    ingresarRoles();
    ingresarPersona();
    ingresarDepartamento();
    ingresarOrganizacion();
    ingresarParametro();
    ingresarDocumento();
    ingresarCaso();
    ingresarTramite();
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
require("./app/routes/permiso.routes")(app);
require("./app/routes/roles.routes")(app);





const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}.`);
});

//-------------------------------Se añade una persona------------------------------------------------
function ingresarPersona() {
  Persona.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      
      new Persona({

        Nombre: "Kevin",
        PApellido: "Mora",
        SApellido: "Valverde",
        FecNaci: "1999-07-14T00:00:00.000+00:00",
        Edad: "22",
        Nacionalidad: "CR",
        direccion: "ahksdjlasjdlkajslkdasd",
        Contacto:
          {
              Correo:"kevinamv14@gmail.com",
              Telefono: "89264496"
          },
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("Añadido 'Persona' a la colección de persona");
      });

    }
  });
}
//------------------------------Se añaden roles---------------------------------
function ingresarRoles() {
  Roles.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {

      
      new Roles({
          nombre: "user",
          descripcion: "Usuario",
          permiso: [{ _id: "62a7acbe55ed63073ca00f0a" }]
              
          
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("Añadido 'user' a la colección de roles");
      });

      new Roles({
          nombre: "moderator",
          descripcion: "Moderador",
          permiso: [{ _id: "62a7acbe55ed63073ca00f0a" }]
             
          
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("Añadido 'moderator' a la colección de roles");
      });

      new Roles({
          nombre: "admin",
          descripcion: "Administrador",
          permiso: [{ _id: "62a7acbe55ed63073ca00f0a" }]
              
          
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("Añadido 'admin' a la colección de roles");
      });
    }
  });
}

//-------------------------------Se añade una organizacion------------------------------------------------
function ingresarOrganizacion() {
  Organizacion.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      
      new Organizacion({

        Nombre: "UNA",
        Fecha_Creacion: "2020-03-01T00:00:00.000+00:00",
        Tipo: "Publica",
          Departamentos: [{ _id: "62a2b5d5665ac23ff8b3ca3b"}],
        Empleados: [{ _id: "62a2b0a469aa0d51584cb521" }]
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("Añadido 'UNA' a la colección de organizacion");
      });

    }
  });
}

//-------------------------------Se añade un documento------------------------------------------------
function ingresarDocumento() {
    Documento.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {

            new Documento({

                Nombre: "Curriculum",
                Anexo: "dh435hids",
                Tipo: "pdf",
                Descripcion: "dsajjaksdlk"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("Añadido 'Curriculum' a la colección de documento");
            });

        }
    });
}

//-------------------------------Se añade un permiso------------------------------------------------
function ingresarPermiso() {
    Permiso.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {

            new Permiso({
                nombre: "Crear departamento",
                descripcion: "Se puede crear un departamento"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("Se añadió permiso");
            });

        }
    });
}

//-------------------------------Se añade un departamento------------------------------------------------
function ingresarDepartamento() {
    Departamento.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {

            new Departamento({
                Nombre: "Recursos humanos",
                Descripcion: "Despedir y contratar empleados",
                Jefe: { _id: "62a2b0a469aa0d51584cb521" },
                Empleados: [{ _id: "62a2b0a469aa0d51584cb521" }],
                Contacto: { Correo: "rhh@gmail.com", Telefono: "8888888" }

            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("Se añadió departamento");
            });

        }
    });
}

//-------------------------------Se añade un parametro------------------------------------------------
function ingresarParametro() {
    Parametro.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {

            new Parametro({
                valor: "ruwioeru"

            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("Se añadió un parametro");
            });

        }
    });
}

//-------------------------------Se añade un caso------------------------------------------------
function ingresarCaso() {
    Caso.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {

            new Caso({
                NumeroCaso: "4ui3o42",
                FechaInicio: "2011-07-14T00:00:00.000+00:00",
                FechaFin: "2012-09-14T00:00:00.000+00:00",
                Estado: "Abierto",
                CasosXDepartamento: [{
                        FechaIniciod: "2011-07-14T00:00:00.000+00:00",
                        FechaFind: "2012-09-14T00:00:00.000+00:00",
                        Departamento: {
                            _id: "62a2b5d5665ac23ff8b3ca3b",
                        }
                    
                }]

            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("Se añadió un caso");
            });

        }
    });
}

//-------------------------------Se añade un tramite------------------------------------------------
function ingresarTramite() {
    Tramite.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {

            new Tramite({
                nombre: "Contrato laboral",
                depaActual: { _id:"62a2b5d5665ac23ff8b3ca3b"},
                ciclo: [
                    {
                        _id: "62a2b5d5665ac23ff8b3ca3b"
                    }
                ],
                documentos: [
                    {
                        _id: "62a2b0a469aa0d51584cb523"
                    }
                ],
                casos: [
                    {
                        _id: "62a2bd03c9a0e45900f0901f"
                    }
                ]
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("Se añadió un tramite");
            });

        }
    });
}
