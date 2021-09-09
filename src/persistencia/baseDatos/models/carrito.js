const mongoose = require('mongoose');

const schema = mongoose.Schema({
    timestamp_Carrito: { type: String, required: true, max: 100 },
    productos: { type: Object, required: true },
});

const Productos = mongoose.model('carrito', schema);

module.exports = Productos;
