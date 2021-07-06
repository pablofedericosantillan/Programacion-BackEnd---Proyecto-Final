const moment = require('moment');
const archivos = require('../persistencia/archivos');
const rutaCarrito= './src/persistencia/carritoCompras.txt';


class Carrito{
    constructor(id,timestamp,carrito){
        this.id=id;
        this.timestamp=timestamp;
        this.producto=carrito;
    }
}

class carritoCompras {
    constructor() {
        this.carro = [];//array de objetos
    }

    async listar() {
        try{
            return archivos.leer(rutaCarrito);
        }catch(err){
            console.log('Error en la funcion listar', err); 
        }
    }

    async buscarPorId(id) {
        try{
            let carritoCompras = await archivos.leer(rutaCarrito);
            let index = carritoCompras.find(p => p.id == id);
            return index || { error: `producto con id ${id} no encontrado`};
        }catch(err){
            console.log('Error en la funcion buscarPorId', err); 
        }

    }

    async agregar(newProduct){
        //if(newProduct.error!=undefined || newProduct.error!=null){
        if(newProduct.error){    
            return { error: `producto no encontrado`};
        }else{
        try{
            let carritoCompras = await archivos.leer(rutaCarrito);
            let id;
            if(carritoCompras == 0){
                id=1;
                }else{
                id=carritoCompras[carritoCompras.length-1].id+1;
                }
            let carrito=new Carrito(id, moment().format("DD/MM/YYYY HH:mm:ss"), newProduct );
            carritoCompras.push(carrito);
            await archivos.guardar(carritoCompras,rutaCarrito);
            return carrito;
        }catch(err){
            console.log('Error en la funcion agregar', err); 
        }

    }
    }
  
    async borrar(id){
        try{
            let carritoCompras = await archivos.leer(rutaCarrito);
            if(id <= carritoCompras.length){
                let index = carritoCompras.findIndex(p => p.id == id);
                carritoCompras.splice(index, 1);
                await archivos.guardar(carritoCompras,rutaCarrito);
                return 'Proceso de borrado exitoso!';
            }else{
            return {error: "producto no encontrado para Borrar" }
            }

        }catch(err){
            console.log('Error en la funcion borrar', err); 
            }
        }
}


module.exports = new carritoCompras();