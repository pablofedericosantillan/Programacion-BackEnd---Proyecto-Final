# Programación Back End -Proyecto Final 
 Se realiza la 2da entrega del Proyecto final del curso de Back End de Coderhouse. 

 Se agrupa el codigo en los siguientes modulos:

 *API: en esta carpeta se encuentran las clases y metodos base: "producto" y "carrito".

 *PERSISTENCIA: contiene manejo de la base de Datos, en este caso se utilizaron 3 bases de datos distintas: MySQL local, MongoDB local y Mongo Atlas. Para elegir la base de datos (tanto para producto como para carrito) se enumera del 1 al 6, colocando la opcion elegida en el archivo "./src/configDataBase.json"(para producto en "DATA_BASE" y para carrito en "DATA_BASE_CARRITO"), de la siguiente manera:

    - Mongodb: 1
    - Mongodb Carrito: 2
    - Mongodb Atlas: 3
    - Mongodb Carrito Atlas: 4
    - Mysql: 5
    - Mysql Carrito: 6

 *ROUTES: contiene los endpoint o rutas solicitadas.

 Para correr se utiliza: 
 
 -Primeramente elegir el tipo de base de datos a utilizar: tanto en "producto" (mysql, mongodb, mongodbAtlas) como "carrito" (mysqlCarrito, mongodbCarrito, mongodbCarritoAtlas), esta configuracion se realiza en el archivo "./src/configDataBase.json"

 -npm start

Para el "carrito" se utilizaron dos estructuras diferentes para el guardado segun la base de datos elegida:
    - Mongodb:
        {
        "_id": "",
        "timestamp_Carrito": "",
        "productos": {
            "_id_producto": "",
            "timestamp": "",
            "nombre": "",
            "descripcion": "",
            "codigo": "",
            "thumbnail": "",
            "precio": "",
            "stock": ""
            },
        };
    
    - MySQL:
        {
        "id": "",
        "timestamp_Carrito": "",
        "id_producto": "",
        "timestamp": "",
        "nombre": "",
        "descripcion": "",
        "codigo": "",
        "thumbnail": "",
        "precio": "",
        "stock": ""
        },
    };