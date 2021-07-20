const productos = require('./models/productos');

const mongoose = require('mongoose');
const config = require('./config/config.json');

/* -------------------- Base de Datos ---------------------- */
const uri= require('../../configDataBase.json');
/* --------------------------------------------------------- */

class MongoDB{
    constructor() {
        
        (async() => {
            if(uri.DATA_BASE == "1"){
            await mongoose.connect(config.MONGO_URL , { useNewUrlParser: true, useUnifiedTopology: true });   
 
            }else{
                await mongoose.connect(config.MONGO_URL_ATLAS , { useNewUrlParser: true, useUnifiedTopology: true });  
            }
            await productos.deleteMany({});
            console.log('Base de Datos:', uri.DATA_BASE==1 ? 'Mongodb':'Mongo Atlas')   
        })()

    }
    async listar(){
        try{
        return await productos.find();
        }catch(err){
            console.log('Error en listar mongo',err); 
        }
    }

    async buscarPorId(id){
        try{
            return await productos.find({_id:id});
        }catch(err){
            console.log('Error en buscarPorId mongo',err); 
        }
    }

    async agregar(newProduct){
        try{
            let p={
                timestamp: newProduct.timestamp,
                nombre: newProduct.nombre,
                descripcion: newProduct.descripcion,
                codigo: newProduct.codigo,
                thumbnail: newProduct.thumbnail,
                precio: newProduct.precio,
                stock: newProduct.stock
            }

            let productoSave= new productos(p);
            await productoSave.save();
            return productoSave;

         }catch(err){
            console.log('Error en guardar mongo',err); 
        }
    }


    async actualizar(id,newProduct){
        try{
            await productos.updateOne({_id: id},{$set: {
            timestamp: newProduct.timestamp,
            nombre: newProduct.nombre,
            descripcion: newProduct.descripcion,
            codigo: newProduct.codigo,
            thumbnail: newProduct.thumbnail,
            precio: newProduct.precio,
            stock: newProduct.stock
        }});
        return productos.find({_id: id});

        }catch(err){
            console.log('Error en actualizar mongo',err); 
        }
    }


    async borrar(id){         
        try{
            let result = await productos.deleteOne({ _id: id });
            return false;
        }catch(err){
            console.log('Error en borrar mongo',err); 
        }             
    }
}

module.exports = new MongoDB();
