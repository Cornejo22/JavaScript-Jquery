//Cargaremos todas las imagenes en un array para después insertarlas en los tags img
var imgTags = document.getElementsByClassName("backen");
var imagenes = ["img/id1.png", "img/id2.png", "img/id3.png", "img/id4.png", "img/id5.png", "img/id6.png", "img/id7.png", "img/id8.png",
    "img/id1.png", "img/id2.png", "img/id3.png", "img/id4.png", "img/id5.png", "img/id6.png", "img/id7.png", "img/id8.png"];
var imagenesr = imagenes.sort(function () { return Math.random() - 0.5 });

//Variables a usar
var primeraCarta = null;
var segundaCarta = null;
var primeraCartac = null;
var segundaCartac = null;
var contadorJ = 0;
var parejas = 0;
var tiempo;
var clicks = 0;

//Mezclar las cartas
function rotarFichas() {
    var elementosTags = $(".back");
    for (let index = 0; index < imgTags.length; index++) {
        imgTags[index].src = imagenesr[index];
    }
}
window.onload = function () {
    desactivar();
    $("#iniciarJuego").attr("disabled", "disabled");
}
//Funcionalidad del juego 
$(document).ready(function () {
    rotarFichas();
    $(function girar() {
        $(".flip").flip({
            trigger: 'manual'
        });
    });
    $("input[name=dificultad]").click(function () {
        $("#iniciarJuego").removeAttr("disabled");
    });
    $("#iniciarJuego").click(function () {
        activar();
        $("#iniciarJuego").attr("disabled", "disabled");
        let dificultad = $('input:radio[name=dificultad]:checked').attr('id');
        $("#facil").attr("disabled", "disabled");
        $("#medio").attr("disabled", "disabled");
        $("#dificil").attr("disabled", "disabled");
        timer(dificultad);
    });
    //Reiniciar Juego
    $("button").click(function () {
        location.reload();
    });
});


function GirarCarta(carta) {
    $(".juego").text("");

    if (contadorJ == 0) {
        primeraCarta = carta.childNodes[3].childNodes[1];
        contadorJ++;
        $(carta).flip(true);
        primeraCartac = carta;
    }
    else {
        if (contadorJ == 1) {
            segundaCarta = carta.childNodes[3].childNodes[1];
            segundaCartac = carta;
            contadorJ = 0;
            //Desactivar todos los clicks para volver a activarlos mas tarde
            desactivar();
            //Comprueba que la casilla no es la misma
            if (($(primeraCarta).attr("id")) !== ($(segundaCarta).attr("id"))) {
                $(carta).flip(true, function () {
                    // Comprueba que no es la misma
                    if (primeraCarta.src !== segundaCarta.src) {
                        setTimeout(function () {
                            $(primeraCartac).flip(false);
                            $(segundaCartac).flip(false);
                            activar();
                            document.getElementById('dead').play()
                            clicks++;
                        }, 500);

                    }
                    else {
                        $(primeraCartac).attr("onClick", "");
                        $(segundaCartac).attr("onClick", "");
                        $(primeraCartac).removeClass("noflip");
                        $(segundaCartac).removeClass("noflip");
                        activar();
                        parejas++;
                        document.getElementById('ring').play()
                        clicks++;
                        if (parejas == 8) {
                            $("button").removeAttr("disabled");
                            $(".juego").text("Has acabado");
                            clearInterval(tiempo);
                        }
                    }
                });
            }
            else {
                GirarCarta(carta);
                activar();
                clicks++;
                $(".juego").text("La carta es la misma");
            }
        }
    }
}
//Desactivar aquellas cartas que tengan el noflip
function desactivar() {
    $(".noflip").attr("onClick", "");
}

//Activar aquellas cartas que tengan el noflip
function activar() {
    $(".noflip").attr("onClick", "GirarCarta(this)");
}

//Tiempo 
function timer(dificultad) {
    var n;
    switch (dificultad) {
        case 'facil':
            n = 0;
            break;
        case 'medio':
            n = 45;
            break;
        case 'dificil':
            n = 30;
            break;
    }
    if (n == 0) {
        $("#number").text("Sin tiempo");
    }
    else {
        if (n == 45 || n == 30) {
            var l = document.getElementById("number");

            tiempo = setInterval(function () {
                n--;
                l.innerHTML = 'Tiempo : ' + n + " Seg " + " Clicks : " + clicks;
                l.style.border = "solid royalblue";
                l.style.borderRadius = '50px';
                if (n == 0) {
                    clearInterval(tiempo);
                    $(".juego").text("Se ha terminado el tiempo");
                    desactivar();
                    $("button").removeAttr("disabled");
                }
            }, 1000);

        }
    }
}


