const moment = require('moment');
/* -------------------- Base de Datos ---------------------- */
const configDataBase = require('../configDataBase.json');
const factory = require('../persistencia/factory');
let instancia = factory.getPersistencia(`${configDataBase.DATA_BASE}`);
/* --------------------------------------------------------- */


class Productos {
    constructor() {

    }

    async listar() {
        try{
            return await instancia.listar();

        }catch(err){
            console.log('Error en la funcion listar', err); 
        }
    }

    async buscarPorId(id){
        try{
            let p = await instancia.listar();
            let index = p.findIndex(x => x.id == id);
            if(index != -1){
                return await instancia.buscarPorId(id) 
            }else{
                return { error: `producto con id ${id} no encontrado`};
            }

        }catch(err){
            console.log('Error en la funcion buscarPorId', err); 
        }
    }

    async agregar(newProduct){
        try{
            newProduct.timestamp= `${moment().format("DD/MM/YYYY HH:mm:ss")}`;
            return await instancia.agregar(newProduct);
        }catch(err){
            console.log('Error en la funcion agregar', err); 
        }
    }

    async actualizar(id,newProduct){
        try{
            let p = await instancia.listar();
            let index = p.findIndex(x => x.id == id);
            if(index != -1){
                newProduct.timestamp= `${moment().format("DD/MM/YYYY HH:mm:ss")}`;
                return await instancia.actualizar(id,newProduct);
            }else{
                return {error: "producto no encontrado para Actualizar" }
            }
        }catch(err){
            console.log('Error en la funcion actualizar', err); 
        }
    }
    
    async borrar(id){        
        try{
            let p = await instancia.listar();
            let index = p.findIndex(x => x.id == id);
            if(index != -1){
                await instancia.borrar(id)
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