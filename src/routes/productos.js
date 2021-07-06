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

router.post('/productos/agregar', administrador , async (req, res) => {
    res.json(await productos.agregar(req.body));
});

router.put('/productos/actualizar/:id', administrador , async (req, res) => {
    let { id } = req.params;
    res.json(await productos.actualizar(id, req.body));
});

router.delete('/productos/borrar/:id', administrador , async (req, res) => {
    let { id } = req.params;
    res.json(await productos.borrar(id));
});


function administrador (req,res,next) {
    if(req.body.administrador !== true){
        res.status(401).send({error:-1, descripcion:`ruta ${req.originalUrl} metodo ${req.method} no autorizada `})
    }else{
        next();
    }
}


module.exports = router;