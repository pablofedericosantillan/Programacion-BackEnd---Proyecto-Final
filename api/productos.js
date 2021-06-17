class Productos {

    constructor() {
        this.item = [];
    }

    listar() {
            return this.item;
    }

    buscarPorId(id) {
        let producto = this.productos.find(p => p.id === id);
        return producto || { error: `producto con id ${id} no encontrado`};
    }

    guardar(newProduct){
        try{
           if(this.item.length === 0){
            newProduct.id=1;
             }else{
            newProduct.id=this.item[this.item.length-1].id+1;
             }

            this.item.push(newProduct);
            return this.item;

           }catch(err){
            console.log('Hubo un error en la funcion guardar'); 
           }
    }

    actualizar(newProduct,id){
        try{
                newProduct.id=id;
                return id <= this.item.length ? (this.item[id-1]=newProduct) : {error: "producto no encontrado para actualizar'" }
    
               }catch(err){
                console.log('Hubo un error en la funcion actualizar'); 
               }
        }
    
    
        borrar(id){
            try{
                return id <= this.item.length ? (this.item.splice(id-1,1)) : {error: "producto no encontrado para borrar'" }
    
               }catch(err){
                console.log('Hubo un error en la funcion borrar'); 
               }
        }
}


module.exports = new Productos();