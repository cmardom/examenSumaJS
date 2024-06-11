let cartas=[];
let etqContadorA = document.getElementById("contadorA");
let etqContadorB = document.getElementById("contadorB");

const etqNombreUsuario = document.getElementById("nombre_usuario");
const inputUsuario = document.getElementById("login");
const inputPass = document.getElementById("password");

const btnCerrarSesion = document.getElementById("botonCerrarSesion");
const btnConsultar = document.getElementById("botonConsultar");

let player = {
    id: 0,
    nombre: "",
    juegosAcabados: 0
};

function cargar_player(id, nombre, juegosAcabados = "A") {
    player.id = id;
    player.nombre = nombre;
    player.juegosAcabados = juegosAcabados;

    //guardar en localStorage
    localStorage.setItem("player", JSON.stringify(player));

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