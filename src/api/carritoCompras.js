const moment = require('moment');
const archivos = require('../persistencia/archivos');

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
        return archivos.leer('./src/persistencia/carritoCompras.txt');
    }

    async buscarPorId(id) {
        let carritoCompras = await archivos.leer('./src/persistencia/carritoCompras.txt');
        let index = carritoCompras.find(p => p.id == id);
        return index || { error: `producto con id ${id} no encontrado`};
    }

    async agregar(newProduct){
        try{
            let carritoCompras = await archivos.leer('./src/persistencia/carritoCompras.txt');

            let carrito=new Carrito(carritoCompras.length + 1, moment().format("DD/MM/YYYY HH:mm:ss"), newProduct );
            carritoCompras.push(carrito);

            await archivos.guardar(carritoCompras,'./src/persistencia/carritoCompras.txt');

            return carritoCompras;

        }catch(err){
            console.log('Hubo un error en la funcion agregar'); 
        }
    }
  
    async borrar(id){
        try{
            let carritoCompras = await archivos.leer('./src/persistencia/carritoCompras.txt');
            if(id <= carritoCompras.length){
                let index = carritoCompras.findIndex(p => p.id == id);
                carritoCompras.splice(index, 1);
                await archivos.guardar(carritoCompras,'./src/persistencia/carritoCompras.txt');
                return carritoCompras;
            }else{
            return {error: "producto no encontrado para Borrar" }
            }

        }catch(err){
            console.log('Hubo un error en la funcion borrar'); 
            }
        }
}


module.exports = new carritoCompras();