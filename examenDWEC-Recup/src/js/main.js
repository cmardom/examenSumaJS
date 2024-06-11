formulario.hidden = false;
zonaJuego.hidden = true;


let ordenValores = ['A','2','3','4','5','6','7','8','9','J','Q','K'];
//Generar cartas, barajarlas y seleccionar la 12 a usar.

//Variables
let juegosAcabados = 0;
        //para controlar los estados del juego:
let estado = 0; /* 0=elegir carta; 1=elegir pila; 2=fin */
const CARTA = 0;
const PILA = 1;
const FIN = 2;

let etqSiguiente;

let cartaSeleccionada = -1; //Índice de carta seleccionada
let pila1 = [];
let puntosPila1 = 0;
let pila2 = [];
let puntosPila2 = 0;

/*¡CREAR CARTAS!*/
let cartasOrdenadas=[];
let palos = ["H"]; //despues los rellenamos con el resto de palos


for (let palo of palos){
    cartasOrdenadas = cartasOrdenadas.concat("A"+palo);
    for(let i=2;i<10;i++){
        cartasOrdenadas = cartasOrdenadas.concat("" + i + palo);
    }
    for(let figura of ['J','Q','K']) {
        cartasOrdenadas = cartasOrdenadas.concat(figura + palo);
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


cartas = _.shuffle(cartasOrdenadas);
cartas = cartasOrdenadas; //Comentar al acabar!!!!
console.log(cartasOrdenadas);
console.log(cartas);

//Cargar datos desde localStorage
let lsPlayer = JSON.parse(localStorage.getItem('player'));
if(lsPlayer){
    cargar_jugador(lsPlayer);
    zonaJuego.hidden = false;
}

//para cargar datos de partida desde LS si se cierra la web
let lsEnJuego = JSON.parse(localStorage.getItem('enJuego'));
if(lsEnJuego){
    cartas=[...lsEnJuego.cartas];
    estado=lsEnJuego.estado;
    cartaSeleccionada=lsEnJuego.cartaSeleccionada;
    pila1=lsEnJuego.pila1;
    pila2=lsEnJuego.pila2;
    puntosPila1=lsEnJuego.puntosPila1;
    puntosPila2=lsEnJuego.puntosPila2;

    etqContadorA.innerText = puntosPila1;
    etqContadorB.innerText = puntosPila2;

    if (pila1.length > 0){
        etqPila1.innerText = "";
        etqPila2.innerText = "";

        for(c of pila1){
            const etqNuevaCarta = document.createElement("img");
            etqNuevaCarta.src = "assets/img/cartas/"+ c + ".png";
            etqPila1.appendChild(etqNuevaCarta);
        }

        for(c of pila2){
            const etqNuevaCarta = document.createElement("img");
            etqNuevaCarta.src = "assets/img/cartas/"+ c + ".png";
            etqPila2.appendChild(etqNuevaCarta);
        }
    }

    
}


//Asignar event listener de cartas
for(let i=0; i<12; i++) {
    const etqCarta=document.getElementById('carta' + i);
    etqCarta.addEventListener('click', () => {
        voltearCarta(i, etqCarta);
    });

    if (lsEnJuego){
        if (pila1.indexOf(cartas[i])>=0 || pila2.indexOf(cartas[i]) >=0){
            etqCarta.src = "assets/img/cartas/grey_back.png";
        } else {
            if (estado==PILA && cartaSeleccionada == i){
                etqCarta.src = rutaCarta(i);

            }
        }
    }
}



//Event listener de botones
const etqNuevoJuego = document.getElementById('nuevoJuego');
etqNuevoJuego.addEventListener('click', () => {
    cartas = _.shuffle(cartasOrdenadas);
    restablecerCartas();
    divMensaje.hidden = true;
    siguiente.innerText = 'Seleccionar carta';
});
etqNuevoJuego.hidden = true;

botonConsultar.addEventListener('click', () => {
    fetch('http://localhost:3000/players').then(resp => {
        resp.json().then(listaJugadores => {
            let encontrado = false;
            for(let j of listaJugadores){
                if(j.nombre == login.value && j.passwd == password.value){
                    cargar_jugador(j);
                    encontrado = true;
                    zonaJuego.hidden = false;


                    break;
                }
            }
            if (!encontrado){
                alert('No se encuentra el jugador');
            }
        })
    }).catch(error => alert("Error del servidor API REST"));
})

botonCerrarSesion.addEventListener('click', cerrarSesion);

