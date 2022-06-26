const mongoose = require("mongoose");

const app = require("./app");
const port = process.env.PORT || 8080;
const config = require("./config");


mongoose.connect(`mongodb://${config.IP_SERVER}:${config.PORT_DB}/${config.DB}`, { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
  if (err) {
    throw err;
  } else {
    console.log("La conexion a la base de datos es correcta.");
    app.listen(port, () => {
      console.log("API REST corriendo en el puerto: " + port );
      console.log(`http://${config.IP_SERVER}:${port}/api/${config.API_VERSION}/`);
    });
  }
});