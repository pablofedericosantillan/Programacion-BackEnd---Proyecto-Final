const socket = io.connect();

/* si recibo productos, los muestro usando handlebars */
socket.on('productos', function (productos) {
    document.getElementById('datos').innerHTML = data2TableHBS(productos);
});

socket.on('mensajes', data =>{ 
    render(data);
});

function render(data){
    let html=data.map(function(elem) {
        return (`
                <div class="form-group">
                <strong style="color:blue;">${elem.email} </strong>
                <em style="color:brown;">${elem.fyh} </em>
                <em style="color:green;">${elem.msj} </em>
                </div>
                `)
    }).join(" ");
    document.getElementById('mensajes').innerHTML=html;
}


function addMessage(event){
    let msj={
        email: document.getElementById('email').value,
        msj: document.getElementById('msj').value,
        fyh: `${moment().format("DD/MM/YYYY HH:mm:ss")}`
    };
    socket.emit('nuevo mensaje', msj)
    return false;
}



/* obtengo el formulario */
const form = document.querySelector('form');

form.addEventListener('submit', event => {
    event.preventDefault();
    const data = { 
        title: document.getElementById('title').value, 
        price: document.getElementById('price').value, 
        thumbnail: document.getElementById('thumbnail').value 
    };

    fetch('/api/productos/guardar', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then(respuesta => respuesta.json())
    .then(productos => {
        form.reset();
        socket.emit('update', 'enviar tabla a todos');
    })
    .catch(error => {
        console.log('ERROR', error);
    });
});

function data2TableHBS(productos) {
    const plantilla = `
        <style>
            .table td,
            .table th {
                vertical-align: middle;
            }
        </style>

        {{#if productos.length}}
        <div class="table-responsive">
            <table class="table table-dark">
                <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Foto</th>
                </tr>
                {{#each productos}}
                <tr>
                    <td>{{this.title}}</td>
                    <td>$ {{ this.price }}</td>
                    <td><img width="50" src={{this.thumbnail}} alt="not found"></td>
                </tr>
                {{/each}}
            </table>
        </div>
        {{/if}}
    `
    var template = Handlebars.compile(plantilla);
    let html = template({ productos: productos, hayProductos: productos.length });
    return html;
}
