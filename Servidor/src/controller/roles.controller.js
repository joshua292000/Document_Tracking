const db = require("../models");
const Roles = db.roles;

//--------------------------Crear roles------------------------------

async function crearRol(req, res) {
  const roles = new Roles(req.body);

  await roles.save((err, userStored) => {
      if (err) {
          res.status(500).send({ message: "El rol ya existe" });
      } else {
          if (!userStored) {
              res.status(404).send({ message: "Error creando el rol" });
          } else {
              res.status(200).send({ user: userStored });
          }
      }
  }).clone().catch(function (err) { console.log(err) })
}
//----------------------------Mostrar todos los roles---------------------------
async function findallroles(req, res) {

  const roles = await Roles.find((err, userStored) => {
      if (err) {
          res.status(500).send({ message: "No existen roles registrados" });
      } else {
          if (!userStored) {
              res.status(404).send({ message: "Error cargando los roles" });
          } else {
              res.status(200).send({ user: userStored });
          }
      }
  }).clone().catch(function (err) { console.log(err) })
}

//-----------------------------Mostrar rol por id--------------------------
async function findByIdrol(req, res) {

  const roles = await Roles.findById(req.params.rolesId, (err, userStored) => {
      if (err) {
          res.status(500).send({ message: "El rol consultado no existe" });
      } else {
          if (!userStored) {
              res.status(404).send({ message: "Error cargando el rol" });
          } else {
              res.status(200).send({ user: userStored });
          }
      }
  }).clone().catch(function (err) { console.log(err) })
}



//-----------------------------Mostrar rol por nombre--------------------------
async function findByName(req, res) {

    const roles = await Roles.find({nombre: req.params.nombre}, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "El rol consultado no existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error cargando el rol" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    }).clone().catch(function (err) { console.log(err) })
  
}


//-----------------------------Actualizar roles--------------------------
async function actualizarRol(req, res) {

  const roles = await Roles.findByIdAndUpdate(req.params.rolesId, req.body, (err, userStored) => {
      if (err) {
          res.status(500).send({ message: "El rol a actualizar no existe" });
      } else {
          if (!userStored) {
              res.status(404).send({ message: "Error actualizando el rol" });
          } else {
              res.status(200).send({ status: 'rol actualizado correctamente' });
          }
      }
  }).clone().catch(function (err) { console.log(err) })


}

//------------------------------Eliminar permisos------------------------------
async function eliminarRol(req, res) {

  await Roles.findByIdAndDelete(req.params.rolesId, (err, userStored) => {
      if (err) {
          res.status(500).send({ message: "El rol a eliminar no existe" });
      } else {
          res.status(200).send({ status: 'rol eliminado' });
      }
  }).clone().catch(function (err) { console.log(err) })


}
module.exports = { crearRol, findallroles, findByIdrol, findByName, actualizarRol, eliminarRol };