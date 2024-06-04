
let player = {
    id: 0,
    nombre: "",
    juegosAcabados: 0
};

function cargar_player(id, nombre, resultado, enJuego = "A") {
    player.id = id;
    player.nombre = nombre;
    player.resultado = resultado;
    player.enJuego = enJuego;
}

let enJuego = {
    cartas: [],
    estado: 0,
    pila1: [],
    pila2: [],
    puntosPila1: 0,
    puntosPila2: 0,
    cartaSeleccionada: -1,
}

function enJuego_reset() {
    // Reinicializar las propiedades a valores por defecto.
    enJuego.cartas = _.shuffle(cartasOrdenadas);
    enJuego.estado= 0;
    enJuego.pila1= [];
    enJuego.pila2= [];
    enJuego.puntosPila1= 0;
    enJuego.puntosPila2= 0;
    enJuego.cartaSeleccionada= -1;
    localStorage.removeItem('enJuego');
}