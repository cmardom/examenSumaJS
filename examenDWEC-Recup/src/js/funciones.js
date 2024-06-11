

function rutaCarta(i) {
    return "assets/img/cartas/"+cartas[i]+".png";
}


function cartaJugada(etqCarta){
    //SI LA CARTA SE ESTÁ MOSTRANDO (NO ESTÁ CON REVERSO ROJO)
}

function valorCarta(carta){
    //carta es algo como "5H"
    let cartaValor = carta.substring(0,1);
    return ordenValores.indexOf(cartaValor)+1; //se compara con el array de valores +1 para sacar el valor de la carta desde 1

}

function restablecerCartas(){

    //PONER TODAS LAS CARGAS CON REVERSO ROJO
    for (let i = 0; i < 12; i++) {
        const etqCarta = document.getElementById("carta"+i);
        etqCarta.src = "assets/img/cartas/red_back.png";
    }

    //VACIAR LAS PILAS Y PONER UNA CARTA CON REVERSO GRIS
    etqPila1.innerText = "";
    const etqCartaGris1 = document.createElement("img");
    etqCartaGris1.src = "assets/img/cartas/grey_back.png"
    etqPila1.appendChild(etqCartaGris1);
    etqPila2.innerText = "";
    const etqCartaGris2 = document.createElement("img");
    etqCartaGris2.src = "assets/img/cartas/grey_back.png"
    etqPila2.appendChild(etqCartaGris2);

    //INICIAR EL RESTO DE VARIABLES Y ELEMENTOS DEL DOM
    estado = 0;
    cartaSeleccionada = -1;
    pila1 = [];
    pila2 = [];
    puntosPila1 = 0;
    puntosPila2 = 2;

}

function voltearCarta(i, etqCarta){
    //Si se puede pulsar sobre las cartas y se pulse
    //una carta que esté bocabajo, voltear la carta.

    if (etqCarta.src.includes("red") && estado==CARTA){
        etqCarta.src = "assets/img/cartas/"+cartas[i]+".png";
        estado=PILA;
        cartaSeleccionada=i; //Solo se guarda el indice
        etqSiguiente = document.getElementById('siguiente');
        etqSiguiente.innerText = "Seleccione pila";

        //localStorage
        enJuego.cartas = cartas;
        enJuego.estado = estado;
        enJuego.cartaSeleccionada = cartaSeleccionada;
        enJuego.pila1 = pila1;
        enJuego.pila2= pila2;
        enJuego.puntosPila1 = puntosPila1;
        enJuego.puntosPila2 = puntosPila2;
        localStorage.setItem("enJuego", JSON.stringify(enJuego));
    }


}

function clickPila(pila,indice) {
    //SI ES EL MOMENTO DE SELECIONAR PILA
    if (estado == PILA){
        let etqPila, puntosPila;


        //COLOCAR CARTA SELECCIONADA EN PILA pila
        if (pila === 1){
            etqPila = etqPila1;
            puntosPila = puntosPila1;
            pila1.push(cartas[indice]); //se guardan en variables para contrlar el final del juego
        } else {
            etqPila = etqPila2;
            puntosPila = puntosPila2;
            pila2.push(cartas[indice]);
        }

        //SI NO HAY CARTAS EN LA PILA, SUSTITUIR LA GRIS
        if (puntosPila==0){
            etqPila.children[0].src = rutaCarta(indice); //se coge el hijo(img) del div
            etqSiguiente.innerText = "Seleccione carta";

            //SI YA HAY CARTAS EN LA PILA, AÑADIR ETIQUETA IMG
        }else{
            const etqNuevaCarta = document.createElement("img");
            etqNuevaCarta.src = rutaCarta(indice);
            etqPila.appendChild(etqNuevaCarta);
        }

        estado=CARTA;


        //SUMAR PUNTUACIÓN A LA pila
        puntosPila+= valorCarta(cartas[indice]);
        if (pila ===1){
            etqContadorA.innerText = puntosPila;
            puntosPila1 = puntosPila;
        } else {
            etqContadorB.innerText = puntosPila;
            puntosPila2 = puntosPila;
        }


        //QUITAR DE LAS CARTAS DE ABAJO (poner reverso gris)
        const etqCarta = document.getElementById('carta'+indice);
        etqCarta.src = "assets/img/cartas/grey_back.png";


        //SI NO QUEDAN MÁS CARTAS, INDICAR PARTIDA ACABADA
        if (pila1.length + pila2.length >= cartas.length){
            etqSiguiente.innerText = "Juego finalizado";
            estado = FIN;
            etqNuevoJuego.hidden = false;
            juegosAcabados+=1;
            player.juegosAcabados = juegosAcabados;
            localStorage.setItem("player", JSON.stringify(player));
            localStorage.removeItem("enJuego");
        }

        enJuego.cartas = cartas;
        enJuego.estado = estado;
        enJuego.cartaSeleccionada = cartaSeleccionada;
        enJuego.pila1 = pila1;
        enJuego.pila2= pila2;
        enJuego.puntosPila1 = puntosPila1;
        enJuego.puntosPila2 = puntosPila2;
        localStorage.setItem("enJuego", JSON.stringify(enJuego));



    }



}
//se le pasa la info de db
function cargar_jugador(j) {
    btnConsultar.hidden = true;
    btnCerrarSesion.hidden = false;
    inputUsuario.hidden = true;
    inputPass.hidden = true;
    etqNombreUsuario.innerText = "Hola, "+j.nombre;
    //para guardarlo en el objeto
    cargar_player(j.id, j.nombre, j.juegosAcabados);
}

function cerrarSesion(){
    btnConsultar.hidden = false;
    btnCerrarSesion.hidden = true;
    inputUsuario.hidden = false;
    inputPass.hidden = false;
    etqNombreUsuario.innerText = "";
    localStorage.removeItem("player");
    zonaJuego.hidden = true;
    localStorage.clear(); // borrar todo
}