var ruta = require("express").Router();
var { mostrarUsuarios, nuevoUsuario, borrarUsuario, BuscarporId } = require("../bd/usuariosBD");

// Obtener todos los usuarios
ruta.get("/", async (req, res) => {
    const usuarios = await mostrarUsuarios();
    res.json(usuarios);
});

// Obtener un usuario por su ID 
ruta.get("/busquedaporid/:id", async (req, res) => {
    const usuarioValido = await BuscarporId(req.params.id);
    res.json(usuarioValido);
});

// Eliminar un usuario por su ID 
ruta.get("/borrarUsuario/:id", async (req, res) => {
    const borrado = await borrarUsuario(req.params.id);
    res.json(borrado);
});

// Crear un nuevo usuario 
ruta.post("/nuevoUsuario", async (req, res) => {
    const usuarioValido = await nuevoUsuario(req.body);
    res.json(usuarioValido);
});

module.exports = ruta;
