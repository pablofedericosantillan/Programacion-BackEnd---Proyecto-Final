const fs = require('fs');

class Archivos{
    constructor(){
    this.ruta='';
    this.mensajes=[];
    }

    async leer(ruta) {
        try {
            let mensajes = await fs.promises.readFile(ruta, 'utf-8')
            return JSON.parse(mensajes);
        }
        catch(error) { 
            return [];
        }
    }

    async guardar(newMsj,ruta){
        this.mensajes= await this.leer(ruta)
        try{
            //newMsj.id=this.mensajes.length+1;
            this.mensajes.push(newMsj);
            await fs.promises.writeFile(ruta, JSON.stringify(this.mensajes,null,'\t'))

           }catch(err){
            console.log('Hubo un error en la funcion guardar'); 
           }
    }
}



module.exports = new Archivos();