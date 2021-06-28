const express = require('express');
const router = express.Router();
const productos = require('../api/productos');

router.get('/productos/listar', async (req, res) => {
    res.json(await productos.listar());
});

router.get('/productos/listar/:id', async (req, res) => {
    let { id } = req.params;
    res.json(await productos.buscarPorId(id));
});

router.post('/productos/agregar', async (req, res) => {
    productos.administrador=true;
    res.json(await productos.agregar(req.body,productos.administrador));
});

router.put('/productos/actualizar/:id', async (req, res) => {
    productos.administrador=true;
    let { id } = req.params;
    res.json(await productos.actualizar(id, req.body, productos.administrador));
});

router.delete('/productos/borrar/:id', async (req, res) => {
    productos.administrador=true;
    let { id } = req.params;
    res.json(await productos.borrar(id,productos.administrador));
});


module.exports = router;