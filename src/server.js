const express = require('express');
const app = express();
const http = require('http').Server(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -------------------- HTTP endpoints ---------------------- */
const productosRouter = require('./routes/productos');
app.use('/api', productosRouter);

const carritoRouter = require('./routes/carrito');
app.use('/api', carritoRouter);


/* ------------------------------------------------------- */

const PORT = process.env.PORT || 8080;
http.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
http.on("error", error => console.log(`Error en servidor ${error}`))
