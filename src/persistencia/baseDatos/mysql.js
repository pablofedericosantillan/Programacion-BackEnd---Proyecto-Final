const options = require('./config/database');
const knex = require('knex')(options);

const tabla ='productos';

/* -------------------- Base de Datos ---------------------- */
const uri= require('../../configDataBase.json');
/* --------------------------------------------------------- */

class MySQL {
    constructor() {

        (async() => {
            await knex.schema.dropTableIfExists('productos');
            await knex.schema.createTable('productos', table => {
                    table.increments('id').notNullable();
                    table.string('timestamp').notNullable();
                    table.string('nombre').notNullable();
                    table.string('descripcion').notNullable();
                    table.string('codigo').notNullable();
                    table.string('thumbnail');
                    table.float('precio');
                    table.float('stock');
                console.log('Base de Datos: MySQL')
        
            });
        })()
    }


    async listar(){
        try{
        return await knex(`${tabla}`).select('*');
        }catch(err){
            console.log('Error en listar mongo',err); 
        }
    }

    async buscarPorId(id){
        try{
            return await knex.from(`${tabla}`).where('id', `${Number(id)}`);
        }catch(err){
            console.log('Error en buscarPorId mongo',err); 
        }
    }



    async agregar(newProduct){
        try{
            let p = await knex(`${tabla}`).insert(newProduct);
            return await knex.from(`${tabla}`).where('id', `${Number(p)}`);;

         }catch(err){
            console.log('Error en la funcion guardar',err); 
        }
    }

   async actualizar(id,newProduct){
        try{
            await knex.from(`${tabla}`).where('id', `${Number(id)}`).update(newProduct);
            return await knex(`${tabla}`).select('*').where('id', id);
        }catch(err){
            console.log('Error en la funcion actualizar',err); 
        }
    }
    
    async borrar(id){         
        try{
            await knex.from(`${tabla}`).where('id', '=', `${id}`).del()
            return false;
        }catch(err){
            console.log('Error en la funcion borrar',err); 
        }             
    }
}

module.exports = new MySQL();