const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const productos = require('./api/productos');
const archivos = require('./api/archivos');

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// definimos las rutas http
const router = express.Router();


/* -------------------- HTTP endpoints ---------------------- */
router.get('/productos/listar', (req, res) => {
    res.json(productos.listar());
});

router.get('/productos/listar/:id', (req, res) => {
    let { id } = req.params;
    res.json(productos.buscarPorId(id));
});

router.post('/productos/guardar', (req, res) => {
    let producto = req.body;
    res.json(productos.guardar(producto));
});

router.put('/productos/actualizar/:id', (req, res) => {
    let { id } = req.params;
    let producto = req.body;
    res.json(productos.actualizar(id, producto));
});

router.delete('/productos/borrar/:id', (req, res) => {
    let { id } = req.params;
    res.json(productos.borrar(id));
});

app.use('/api', router);

/* -------------------- Web Sockets ---------------------- */
const mensajes = [
    { email: '', msj: '', fyh: '' },
];

io.on('connection', socket => {
    console.log('Welcome!');

    /* Socket para tabla de productos */
    socket.emit('productos', productos.listar());
    socket.on('update', data => {
        io.sockets.emit('productos', productos.listar());
    });

    /* Socket para chat */
    socket.emit('mensajes', mensajes);
    socket.on('nuevo mensaje', msj=>{
        mensajes.push(msj)
        archivos.guardar(msj,'./mensajes.txt');
        io.sockets.emit('mensajes', mensajes)
    })
});
/* ------------------------------------------------------- */

const PORT = 8080;
http.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
http.on("error", error => console.log(`Error en servidor ${error}`))
