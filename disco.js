class Disco {
    constructor(nombre, grupo, año, tipo, localizacion) {
        this.nombre = nombre;
        this.grupo = grupo;
        this.año = año;
        this.tipo = tipo;
        this.localizacion = localizacion;
        this.prestado = false;
    }
    //Realmente esta funciones del objeto están hechas pero nunca se aplican por el tema de que
    //no se usan en las funciones que se piden en el documento
    cambiarLocalizacion(nuevaLocalizacion) {
        this.localizacion = nuevaLocalizacion;
    }
    
    cambiarPrestado(estado) {
        this.prestado = estado;
    }
    //La verdad que no uso mostrar informacion, porque es mejor representarlo por atributos individuales y no un string
    //Pero por si acaso lo dejo
    mostrarInformacion() {
        return `Nombre: ${this.nombre}, Grupo: ${this.grupo}, Año: ${this.año}, Tipo: ${this.tipo}, Localización: ${this.localizacion}, Prestado: ${this.prestado}`;
    }
}