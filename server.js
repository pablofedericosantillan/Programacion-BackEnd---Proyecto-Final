const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const handlebars = require('express-handlebars');
const productos = require('./api/productos');

// establecemos la configuración de handlebars
app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
    })
);
app.set("view engine", "hbs");
app.set("views", "./views");

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

router.get('/productos/vista', (req, res) => {
    res.render('vista', { productos: productos.listar(), hayProductos: productos.listar().length });
});

app.use('/api', router);

/* -------------------- Web Sockets ---------------------- */
io.on('connection', socket => {
    console.log('Welcome!');

    socket.emit('productos', productos.listar());

    /* Escucho los mensajes enviado por el cliente y se los propago a todos */
    socket.on('update', data => {
        io.sockets.emit('productos', productos.listar());
    });

});
/* ------------------------------------------------------- */

const PORT = 8080;
http.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
http.on("error", error => console.log(`Error en servidor ${error}`))
