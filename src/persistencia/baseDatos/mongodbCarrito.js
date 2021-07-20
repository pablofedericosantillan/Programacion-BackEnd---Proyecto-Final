const carrito = require('./models/carrito');

const mongoose = require('mongoose');
const config = require('./config/config.json');

/* -------------------- Base de Datos ---------------------- */
const uri= require('../../configDataBase.json');
/* --------------------------------------------------------- */

class MongoCarrito {
    constructor() {
        
        (async() => {

            if(uri.DATA_BASE_CARRITO == "2"){
                await mongoose.connect(config.MONGO_URL , { useNewUrlParser: true, useUnifiedTopology: true });   
            }else{
                await mongoose.connect(config.MONGO_URL_ATLAS , { useNewUrlParser: true, useUnifiedTopology: true });   
            }
            await carrito.deleteMany({});
            console.log('Base de Datos:', uri.DATA_BASE_CARRITO==2 ? 'MongodbCarrito':'MongodbCarrito Atlas')   
        })()

    }
    async listar(){
        try{
        return await carrito.find();
        }catch(err){
            console.log('Error en listar mongoCarrito',err); 
        }
    }

    async buscarPorId(id){
        try{
            return await carrito.find({_id:id});
        }catch(err){
            console.log('Error en buscarPorId mongoCarrito',err); 
        }
    }

    async agregar(newProduct){
        try{
            let p={
                timestamp_Carrito: newProduct.timestamp_Carrito,
                productos: newProduct.producto
            }

            let carritoSave= new carrito(p);
            carrito
            await carritoSave.save();
            return carritoSave;

         }catch(err){
            console.log('Error en guardar por ID mongoCarrito',err); 
        }
    }

    async borrar(id){         
        try{
            let result = await carrito.deleteOne({ _id: id });
            return false;
        }catch(err){
            console.log('Error en borrar mongoCarrito',err); 
        }             
    }
}

module.exports = new MongoCarrito();

//export default MongoDB;