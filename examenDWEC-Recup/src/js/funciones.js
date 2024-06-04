

function rutaCarta(i) {
    //DEVUELVE LA RUTA PARA LA CARTA EN EL ARRAY cartas[i]
}


function cartaJugada(etqCarta){
    //SI LA CARTA SE ESTÁ MOSTRANDO (NO ESTÁ CON REVERSO ROJO)
}

function valorCarta(carta){
    //carta es algo como "5H"
}

function restablecerCartas(){

    //PONER TODAS LAS CARGAS CON REVERSO ROJO

    //VACIAR LAS PILAS Y PONER UNA CARTA CON REVERSO GRIS

    //INICIAR EL RESTO DE VARIABLES Y ELEMENTOS DEL DOM

}

function voltearCarta(i, etqCarta){
    //Si se puede pulsar sobre las cartas y se pulse
    //una carta que esté bocabajo, voltear la carta.

    if (etqCarta.src.includes("red") && estado==CARTA){
        etqCarta.src = "assets/img/cartas/"+cartas[i]+".png";
        estado=PILA;
        cartaSeleccionada=i; //Solo se guarda el indice
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
        } else {
            etqPila = etqPila2;
            puntosPila = puntosPila2;
        }

        //SI NO HAY CARTAS EN LA PILA, SUSTITUIR LA GRIS
        if (puntosPila==0){


            //SI YA HAY CARTAS EN LA PILA, AÑADIR ETIQUETA IMG
        }else{

        }


        //SUMAR PUNTUACIÓN A LA pila

        //QUITAR DE LAS CARTAS DE ABAJO (poner reverso gris)

        //SI NO QUEDAN MÁS CARTAS, INDICAR PARTIDA ACABADA

        //SI QUEDAN MÁS CARTAS, INDICAR QUE TOCA SELECCIONAR CARTA
    }



}

function cargar_jugador(j) {

}

function cerrarSesion(){

}