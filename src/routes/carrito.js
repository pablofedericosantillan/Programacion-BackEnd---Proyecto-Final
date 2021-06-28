const express = require('express');
const router = express.Router();
const carritoCompras = require('../api/carritoCompras');
const productos = require('../api/productos');

router.get('/carrito/listar', async (req, res) => {
    res.json(await carritoCompras.listar());
});

router.get('/carrito/listar/:id', async (req, res) => {
    let { id } = req.params;
    res.json(await carritoCompras.buscarPorId(id));
});

router.post('/carrito/agregar/:id', async (req, res) => {
    let { id } = req.params;
    res.json(await carritoCompras.agregar(await productos.buscarPorId(id)));
});

router.delete('/carrito/borrar/:id', async (req, res) => {
    let { id } = req.params;
    res.json(await carritoCompras.borrar(id));
});

module.exports = router;