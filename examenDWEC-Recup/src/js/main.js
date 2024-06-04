
// Descomentar para parte 3
// formulario.hidden = false;
// zonaJuego.hidden = true;

let ordenValores = ['A','2','3','4','5','6','7','8','9','J','Q','K'];
//Generar cartas, barajarlas y seleccionar la 12 a usar.

//Variables
let juegosAcabados = 0;
let estado = 0; /* 0=elegir carta; 1=elegir pila; 2=fin */
const CARTA = 0;
const PILA = 1;
const FIN = 2;
let cartaSeleccionada = -1; //Índice de carta seleccionada
let pila1 = [];
let puntosPila1 = 0;
let pila2 = [];
let puntosPila2 = 0;

for(let i=2;i<10;i++){
    cartasOrdenadas = cartasOrdenadas.concat("" + i + palo);
}
for(let figura of ['J','Q','K']) {
    cartasOrdenadas = cartasOrdenadas.concat(figura + palo);
}
let cartas = _.shuffle(cartasOrdenadas);
cartas = cartasOrdenadas; //Comentar al acabar
console.log(cartasOrdenadas);
console.log(cartas);

//Cargar datos desde localStorage
let lsPlayer = JSON.parse(localStorage.getItem('player'));
if(lsPlayer){
    cargar_jugador(lsPlayer);
}

let lsEnJuego = JSON.parse(localStorage.getItem('enJuego'));
if(lsEnJuego){
    cartas = lsEnJuego.cartas;
    siguiente = lsEnJuego.siguiente;
    acertadas = lsEnJuego.acertadas;
    etqSiguiente = document.getElementById('siguiente');
    etqSiguiente.innerText = siguiente;
    
}


//Asignar event listener de cartas
for(let i=0; i<12; i++) {
    const etqCarta=document.getElementById('carta' + i);
    etqCarta.addEventListener('click', () => {
        voltearCarta(i, etqCarta);
    });
    //voltear carta si estaba en juego
    if (lsEnJuego && esMenor(cartas[i], siguiente)){
        etqCarta.src = rutaCarta(i);
    }
}
const etqPila1=document.getElementById('pila1');
etqPila1.addEventListener('click', () => {
    clickPila(1, cartaSeleccionada);
});
const etqPila2=document.getElementById('pila2');
etqPila2.addEventListener('click', () => {
    clickPila(2, cartaSeleccionada);
});

//Event listener de botones
document.getElementById('nuevoJuego').addEventListener('click', () => {
    cartas = _.shuffle(cartasOrdenadas);
    restablecerCartas();
    divMensaje.hidden = true;
    siguiente.innerText = 'Seleccionar carta';
})

botonConsultar.addEventListener('click', () => {
    fetch('http://localhost:3000/players').then(resp => {
        resp.json().then(listaJugadores => {
            let encontrado = false;
            for(let j of listaJugadores){
                if(j.nombre == login.value && j.passwd == password.value){
                    cargar_jugador(j);
                    encontrado = true;
                    break;
                }
            }
            if (!encontrado){
                alert('No se encuentra el jugador');
            }
        })
    }).catch(error => alert("Error del servidor API REST"));
})

botonCerrarSesion.addEventListener('click', cerrarSesion)