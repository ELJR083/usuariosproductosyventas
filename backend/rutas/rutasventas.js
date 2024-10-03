const express = require("express");
const ruta = express.Router();
const { nuevaVenta, mostrarVentas, buscarVentaPorId, actualizarStatus, borrarVenta } = require("../bd/ventasBD");

// Ruta para crear una nueva venta
ruta.post("/nuevaVenta", async (req, res) => {
    const ventaValida = await nuevaVenta(req.body);
    res.json({ success: ventaValida });
});

// Ruta para mostrar todas las ventas
ruta.get("/ventas", async (req, res) => {
    const ventas = await mostrarVentas();
    res.json(ventas);
});

// Ruta para buscar una venta por su ID
ruta.get("/buscarPorIdv/:id", async (req, res) => {
    const venta = await buscarVentaPorId(req.params.id);
    res.json(venta);
});

// Ruta para actualizar el status de una venta
ruta.patch("/actualizarStatus/:id", async (req, res) => {
    const actualizacionExitosa = await actualizarStatus(req.params.id, req.body.status);
    res.json({ success: actualizacionExitosa });
});

// Ruta para eliminar 
ruta.get("/borrarVenta/:id", async (req, res) => {
    const eliminacionExitosa = await borrarVenta(req.params.id);
    res.json({ success: eliminacionExitosa });
});

module.exports = ruta;
