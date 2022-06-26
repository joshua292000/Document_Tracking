const bcrypt = require("bcrypt-nodejs");
const db = require("../models");
const Usuario = db.usuario;


function registrarusuario(req, res) {
    const usuario = new Usuario(req.body);

    bcrypt.hash(usuario.contrasena, null, null, function (err, hash) {
        if (err) {
            res.status(500).send({ message: "Error enciptando la clave." });
        } else {
            usuario.contrasena = hash;
            usuario.save((err, userStored) => {
                if (err) {
                    res.status(500).send({ message: "El usuario ya existe" });
                } else {
                    if (!userStored) {
                        res.status(404).send({ message: "Error creandon el usuario" });
                    } else {
                        res.status(200).send({ user: userStored });
                    }
                }
            })
        }
    })
}

async function findByIdUsuario(req, res) {

    const usuario = await Usuario.findById(req.params.usuarioId, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "El usuario consultado no existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error cargando los usuarios" });
            } else {
                res.status(200).send({ user: userStored });
            }
        }
    }).clone().catch(function (err) { console.log(err) })
}


async function findByNameAndPassword(req, res) {

    const usuario = await Usuario.find({ nombre_usuario: req.params.nombre }, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "El usuario consultado no existe" });
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Error cargando los usuarios" });
            } else {

                if (userStored.length > 0) {

                    bcrypt.compare(req.params.contrasena, userStored[0].contrasena, (err, resc) => {
                        if (resc) {
                            res.status(200).send({ user: userStored });
                        } else {
                            res.status(500).send({ message: "Usuario o contrasena erroneos" });
                        }
                    })

                } else {
                    res.status(500).send({ message: "El usuario consultado no existe" });
                }

            }
        }
    }).clone().catch(function (err) { console.log(err) })
}

module.exports = {registrarusuario, findByIdUsuario, findByNameAndPassword};