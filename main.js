//Práctica de Clientes/Diseño hecha por Francisco José Garcia Reinoso

let discos = []; //Inicializamos nuestra mini base de datos de discos
//añadimos event listener para que al pulsar el botón de la sidebar se muestre el menú
document.addEventListener('DOMContentLoaded', function() {
    inicializarDiscos();
    document.getElementById('toggle-menu').addEventListener('click', function() {
        let sidebar = document.getElementById('sidebar');
        let toggleButton = document.getElementById('toggle-menu');
        if (sidebar.classList.contains('d-none')) {
            sidebar.classList.remove('d-none');
            toggleButton.style.display = 'none';
        }
    });
    //Además precargamos los discos iniciales para que no se vea vacío y mostramos la orden que se ha cargado en nuestro div de info
    mostrarListadoDiscos();
    document.getElementById('resultado').innerText = 'Ejecutando lista inicial';
});
//Simplemente la carga inicial de discos
function inicializarDiscos() {
    discos.push(new Disco('The Dark Side of the Moon', 'Pink Floyd', 1973, 'rock', 1));
    discos.push(new Disco('Thriller', 'Michael Jackson', 1982, 'pop', 'Madrid'));
    discos.push(new Disco('Nevermind', 'Nirvana', 1991, 'punk', 3));
    discos.push(new Disco('AM', 'Arctic Monkeys', 2013, 'indie', 'Granada'));
}
//Contamos discos y representamos (En el div de resultado siempre vamos a mostrar la orden hecha por si acaso)
function mostrarNumeroDiscos() {
    document.getElementById('contenido-principal').innerText = `Número de discos: ${discos.length}`;
    document.getElementById('resultado').innerText = 'Se está mostrando la opción: Mostrar número de discos';
}
//Mostramos el listado de discos usando listas de bootstrap
function mostrarListadoDiscos() {
    let listado = discos.map(disco => `<li class="list-group-item">${disco.mostrarInformacion()}</li>`).join('');
    document.getElementById('contenido-principal').innerHTML = `<ul class="list-group">${listado}</ul>`;
    document.getElementById('resultado').innerText = 'Se está mostrando la opción: Mostrar listado de discos';
}
//Mostramos el intervalo, pidiendo inicio y fin, y mostramos en lista de boostrap añadiendo el intervalo a resultado para ver el filtro que hemos aplicado
function mostrarIntervaloDiscos() {
    let inicio = prompt("Introduce el año inicial:");
    let fin = prompt("Introduce el año final:");
    let listado = discos.filter(disco => disco.año >= inicio && disco.año <= fin)
                        .map(disco => `<li class="list-group-item">${disco.mostrarInformacion()}</li>`).join('');
    document.getElementById('contenido-principal').innerHTML = `<ul class="list-group">${listado}</ul>`;
    document.getElementById('resultado').innerText = `Se está mostrando la opción: Mostrar intervalo de discos (${inicio}-${fin})`;
}
//Cambiamos la visual central por nuestro formulario para añadir un disco
function mostrarFormularioAñadirDisco() {
    let formularioHTML = `
        <form id="form-disco">
            <div class="form-group">
                <label for="nombre">Nombre del disco:</label>
                <input type="text" class="form-control" id="nombre" name="nombre">
            </div>
            <div class="form-group">
                <label for="grupo">Grupo de música o cantante:</label>
                <input type="text" class="form-control" id="grupo" name="grupo">
            </div>
            <div class="form-group">
                <label for="año">Año de publicación:</label>
                <input type="number" class="form-control" id="año" name="año">
            </div>
            <div class="form-group">
                <label for="tipo">Tipo de música:</label>
                <select class="form-control" id="tipo" name="tipo">
                    <option value="rock">Rock</option>
                    <option value="pop">Pop</option>
                    <option value="punk">Punk</option>
                    <option value="indie">Indie</option>
                </select>
            </div>
            <div class="form-group">
                <label for="localizacion">Localización:</label>
                <input type="text" class="form-control" id="localizacion" name="localizacion">
            </div>
            <button type="button" class="btn btn-success" onclick="guardarDisco()">Guardar Disco</button>
        </form>
    `;
    document.getElementById('contenido-principal').innerHTML = formularioHTML;
    document.getElementById('resultado').innerText = 'Se está mostrando la opción: Añadir un disco';
}

//Funcion borrar disco, solo por nombre, si no existe no hace nada
function borrarDisco() {
    let nombre = prompt("Introduce el nombre del disco que quieres borrar:");
    let index = discos.findIndex(disco => disco.nombre === nombre);
    if (index !== -1) {
        discos.splice(index, 1);
        mostrarNumeroDiscos();
    } else {
        alert("Disco no encontrado.");
    }
    document.getElementById('resultado').innerText = 'Se está mostrando la opción: Borrar un disco';
}
// Consuyltamos el disco por nombre o por posición, y a parte lo mostramos en una card de bootstrpa para que no se vea como una linea pocha
//Aunque lo suyo sería tbn añadirle la caratula del disco y demas, por eso está pensado como card, solo que era coñazo añadir img tbn al objeto
function consultarDisco() {
    let criterio = prompt("¿Cómo quieres consultar el disco? (posición, nombre)");
    let resultado;
    if (criterio === "posición") {
        let posicion = prompt("Introduce la posición del disco:");
        resultado = discos[Number(posicion)];
    } else {
        let nombre = prompt("Introduce el nombre del disco:");
        resultado = discos.find(disco => disco.nombre === nombre);
    }
    if (resultado) {
        document.getElementById('contenido-principal').innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${resultado.nombre}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${resultado.grupo}</h6>
                    <p class="card-text">Año: ${resultado.año}</p>
                    <p class="card-text">Tipo: ${resultado.tipo}</p>
                    <p class="card-text">Localización: ${resultado.localizacion}</p>
                </div>
            </div>
        `;
    } else {
        alert("Disco no encontrado.");
    }
    document.getElementById('resultado').innerText = 'Se está mostrando la opción: Consultar un disco';
}
//Funcion para el boton del formulario, para guardar el disco
function guardarDisco() {
    let form = document.getElementById('form-disco');
    let nuevoDisco = new Disco(
        form.nombre.value,
        form.grupo.value,
        form.año.value,
        form.tipo.value,
        form.localizacion.value
    );
    discos.push(nuevoDisco);
    form.reset();
    mostrarListadoDiscos();
}
//Funcion cerrar menu, donde cambiamos la visibilidad del boton que se oculta y el menu en si
function cerrarMenu() {
    let sidebar = document.getElementById('sidebar');
    let toggleButton = document.getElementById('toggle-menu');
    sidebar.classList.add('d-none');
    toggleButton.style.display = 'block';
    toggleButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M10.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L9.293 7.5H1.5a.5.5 0 0 0 0 1h7.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
        </svg>
    `;
}