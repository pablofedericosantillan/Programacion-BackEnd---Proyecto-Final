const moment = require('moment');
const archivos = require('../persistencia/archivos');
const rutaProductos = './src/persistencia/productos.txt';

class Productos {
    constructor() {
        this.item = [];
    }

    async listar() {
        try{
            return archivos.leer(rutaProductos);

        }catch(err){
            console.log('Error en la funcion listar', err); 
        }
    }

    async buscarPorId(id){
        try{
            let producto = await archivos.leer(rutaProductos);
            let index = producto.find(p => p.id == id);
            return index || { error: `producto con id ${id} no encontrado`};
        }catch(err){
            console.log('Error en la funcion buscarPorId', err); 
        }
    }

    async agregar(newProduct){
        try{
            let producto = await archivos.leer(rutaProductos);
                if(producto.length == 0){
                newProduct.id=1;
                }else{
                newProduct.id=producto[producto.length-1].id+1;
                }
            newProduct.timestamp= `${moment().format("DD/MM/YYYY HH:mm:ss")}`
            producto.push(newProduct);
            await archivos.guardar(producto,rutaProductos);
            return newProduct;
        }catch(err){
            console.log('Error en la funcion agregar', err); 
        }
    }

    async actualizar(id,newProduct){
        try{
            let producto = await archivos.leer(rutaProductos);
            if(id <= producto.length){
                newProduct.id = Number(id);
                newProduct.timestamp= `${moment().format("DD/MM/YYYY HH:mm:ss")}`
                let index = producto.findIndex(p => p.id == id);
                producto.splice(index, 1, newProduct);
                await archivos.guardar(producto,rutaProductos);
                return newProduct;
            }else{
                return {error: "producto no encontrado para Actualizar" }
            }
        }catch(err){
            console.log('Error en la funcion actualizar', err); 
        }
    }
    
    async borrar(id){        
        try{
            let producto = await archivos.leer(rutaProductos);
            if(id <= producto.length){
                let index = producto.findIndex(p => p.id == id);
                producto.splice(index, 1);
                await archivos.guardar(producto,rutaProductos);
                return 'Proceso de borrado exitoso!';
            }else{
            return {error: "producto no encontrado para Borrar" }
            }
        }catch(err){
            console.log('Error en la funcion borrar', err); 
        }             
    }
}

module.exports = new Productos();