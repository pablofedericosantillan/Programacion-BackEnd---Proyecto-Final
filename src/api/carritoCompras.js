const moment = require('moment');

/* -------------------- Base de Datos ---------------------- */
const configDataBase = require('../configDataBase.json');
const factoryCarrito = require('../persistencia/factory');
let instanciaCarrito = factoryCarrito.getPersistencia(`${configDataBase.DATA_BASE_CARRITO}`);
/* --------------------------------------------------------- */

class Carrito{
    constructor(timestamp_Carrito,producto){
        this.timestamp_Carrito=timestamp_Carrito;
        this.producto=producto;
    }
}

class carritoCompras {
    constructor() {

    }

    async listar() {
        try{
            return await instanciaCarrito.listar();

        }catch(err){
            console.log('Error en listar Carrito', err); 
        }

    }

    async buscarPorId(id) {
        try{
            let p = await instanciaCarrito.listar();
            let index = p.findIndex(x => x.id == id);
            if(index != -1){
                return await instanciaCarrito.buscarPorId(id) 
            }else{
                return { error: `producto con id ${id} no encontrado`};
            }

        }catch(err){
            console.log('Error en la funcion buscarPorId', err); 
        }

    }

    async agregar(newProduct){
        if(newProduct.error){    
            return { error: `producto no encontrado`};
        }else{
        try{
            let carrito=new Carrito(moment().format("DD/MM/YYYY HH:mm:ss"), newProduct[0] );
            return await instanciaCarrito.agregar(carrito);
        }catch(err){
            console.log('Error en la funcion agregar', err); 
        }

    }
    }

    async borrar(id){
            try{
                let p = await instanciaCarrito.listar();
                let index = p.findIndex(x => x.id == id);
                if(index != -1){
                    await instanciaCarrito.borrar(id)
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