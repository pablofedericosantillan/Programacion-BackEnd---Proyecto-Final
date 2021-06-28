const moment = require('moment');
const archivos = require('../persistencia/archivos');


class Productos {
    constructor() {
        this.item = [];
        this.administrador = '';
    }

    async listar() {
        return archivos.leer('./src/persistencia/productos.txt');
    }

    async buscarPorId(id){
        let producto = await archivos.leer('./src/persistencia/productos.txt');
        let index = producto.find(p => p.id == id);
        return index || { error: `producto con id ${id} no encontrado`};
    }

    async agregar(newProduct,admin){
        if(admin === true){
            try{
                let producto = await archivos.leer('./src/persistencia/productos.txt');

                newProduct.id = producto.length + 1;
                newProduct.timestamp= `${moment().format("DD/MM/YYYY HH:mm:ss")}`
                producto.push(newProduct);

                await archivos.guardar(producto,'./src/persistencia/productos.txt');

                return producto;

           }catch(err){
                console.log('Hubo un error en la funcion agregar'); 
           }
        }else {
            return { error : -1, descripcion: "ruta 'api/productos/agregar' método 'agregar' no autorizado"};
        }

    }

    async actualizar(id,newProduct,admin){
        if(admin === true){
            try{
                let producto = await archivos.leer('./src/persistencia/productos.txt');
                if(id <= producto.length){
                    newProduct.id = Number(id);
                    newProduct.timestamp= `${moment().format("DD/MM/YYYY HH:mm:ss")}`
                    let index = producto.findIndex(p => p.id == id);
                    producto.splice(index, 1, newProduct);
                    await archivos.guardar(producto,'./src/persistencia/productos.txt');
                    return producto;
                }else{
                    return {error: "producto no encontrado para Actualizar" }
                }



            }catch(err){
                console.log('Hubo un error en la funcion actualizar'); 
            }
        }else {
        return { error : -1, descripcion: "ruta 'api/productos/guardar' método 'guardar' no autorizado"};
        }
    }
    
    async borrar(id,admin){
        if(admin === true){            
            try{
                let producto = await archivos.leer('./src/persistencia/productos.txt');
                if(id <= producto.length){
                    let index = producto.findIndex(p => p.id == id);
                    producto.splice(index, 1);
                    await archivos.guardar(producto,'./src/persistencia/productos.txt');
                    return producto;
                }else{
                return {error: "producto no encontrado para Borrar" }
                }
    
               }catch(err){
                console.log('Hubo un error en la funcion borrar'); 
               }
        }else {
                return { error : -1, descripcion: "ruta 'api/productos/guardar' método 'guardar' no autorizado"};
        }               
    }
}

module.exports = new Productos();