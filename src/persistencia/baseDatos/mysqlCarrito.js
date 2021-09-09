const options = require('./config/database');
const knex = require('knex')(options);

const tabla ='carrito';


class MySQL {
    constructor() {

        (async() => {
            await knex.schema.dropTableIfExists('carrito');
            await knex.schema.createTable('carrito', table => {
                    table.increments('id').notNullable();
                    table.string('timestamp_Carrito').notNullable();
                    table.string('id_producto').notNullable();
                    table.string('timestamp').notNullable();
                    table.string('nombre').notNullable();
                    table.string('descripcion').notNullable();
                    table.string('codigo').notNullable();
                    table.string('thumbnail');
                    table.float('precio');
                    table.float('stock');
                    console.log('Base de Datos: MySQL_Carrito') 
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
            let q = {
                timestamp_Carrito: newProduct.timestamp_Carrito,
                id_producto: newProduct.producto.id,
                timestamp: newProduct.producto.timestamp,
                nombre: newProduct.producto.nombre,
                descripcion: newProduct.producto.descripcion,
                codigo: newProduct.producto.codigo,
                thumbnail: newProduct.producto.thumbnail,
                precio: newProduct.producto.precio,
                stock: newProduct.producto.stock
            };
            let p = await knex(`${tabla}`).insert(q);
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