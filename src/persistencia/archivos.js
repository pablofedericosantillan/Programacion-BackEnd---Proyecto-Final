const fs = require('fs');

class Archivos{
    constructor(){
    }

    async leer(ruta) {
        try {
            let item = await fs.promises.readFile(ruta, 'utf-8')
            return await JSON.parse(item);
        }
        catch(error) { 
            return [];
        }
    }

    async guardar(newProduct,ruta){
        try{
            await fs.promises.writeFile(ruta, JSON.stringify(newProduct,null,'\t'))
            return newProduct;
           }catch(err){
            console.log('Hubo un error en la funcion guardar en Archivos'); 
           }
    }
}



module.exports = new Archivos();