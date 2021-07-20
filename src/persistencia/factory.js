class PersistenciaFactory {

    constructor() { 
        
    }

    getPersistencia(tipo) {
        try {
            /*if(tipo == "mongodbAtlas"){
                tipo='mongodb';
            }
            if(tipo == "mongodbCarritoAtlas"){
                tipo="mongodbCarrito";
            }*/
            switch (tipo) {
                case '1':
                    tipo='mongodb';
                    break;
                case '2':
                    tipo='mongodbCarrito';
                    break;                
                case '3':
                    tipo='mongodb';//mongo atlas - utilizamos la clase ya armada para mongo local
                    break;               
                 case '4':
                    tipo='mongodbCarrito';//mongoCarrito atlas - utilizamos la clase ya armada para mongo local
                    break;
                case '5':
                    tipo='mysql';
                    break;                
                case '6':
                    tipo='mysqlCarrito';
                    break;                   
            }
            let modulo = require(`./baseDatos/${tipo}`);
            return modulo;
            
        } catch (error) {
            console.log('No se encontro el tipo de persistencia:', tipo, error);
        }
    }
}

module.exports = new PersistenciaFactory();

