var arrayElementos;
var intentos = 10;
var arrayUsuario = [];
var arrayColores = ["red", "yellow", "green", "grey", "white", "pink", "blue", "purple", "brown", "cyan"];

window.onload = function () {
    $(".derecha").append("<table><tbody> <tr><td><p>Lista de Colores</p></td></tr>  <tr class='trB'></tr></tbody></table>");
    for (let i = 0; i < arrayColores.length; i++) {
        $(".trB").append("<td class=" + arrayColores[i] + ">" + i + "</td>");
    }
    var i = 0;
    while (i <= 3) {
        $(".derecha").append("<input type='text' id=color" + i + " maxlength='1' oninput=cambio(this,this.value) disabled='disabled'/>");
        i++;
    }
    $(".derecha").append("</br><input type='button' id=partida onClick=nuevaPartida() value='Nueva Partida'/>");
    $(".derecha").append("<input type='button' id='comprobar' onClick=compruebaAciertos() value='Comprobar' disabled='disabled'/>");
    $(".derecha").append("<div class='todo'></div>");
    $(".todo").append("<span id='nIntentos'></span>");
    $(".todo").append("<span id='aciertos'></span>");
    $(".todo").append("<span id='heridos'></span>");
    $(".todo").append("<span id='solucion'></span>");
    $(".todo").append("<span id='resultado'></span>");
    $("#nIntentos").text("Intentos : " + intentos);
    $("#aciertos").text("Aciertos : " + 0);
    $("#heridos").text("Heridos : " + 0);
};



function nuevaPartida() {
    $("#comprobar").prop('disabled', false);
    $("#partida").prop('disabled', true);
    intentos = 10;
    $("#nIntentos").text("Intentos : " + intentos);
    $("#aciertos").text("Aciertos : " + 0);
    $("#heridos").text("Heridos : " + 0);
    $("#solucion").text("");
    $("#resultado").text("");
    $("#listaComprobaciones").empty();
    for (let i = 0; i <= 3; i++) {
        $("#color" + i).val("");
        $("#color" + i).attr("disabled", false);
    }

    arrayUsuario = [];
    arrayElementos = [];

    while (arrayElementos.length != 4) {
        let contador = 0;
        let numA = Math.round(Math.random() * 9);
        if (arrayElementos.length == 0) {
            arrayElementos.push(arrayColores[numA]);
        }
        else {
            if (!arrayElementos.includes(arrayColores[numA])) {
                arrayElementos.push(arrayColores[numA]);
            }
        }
    }
    console.log(arrayElementos);
}

function compruebaAciertos() {
    let resultado = comprobar();
    let colores;

    if (intentos == 0 && resultado[0] != 4) {
        $("#partida").prop("disabled", false);
        $("#comprobar").prop("disabled", true);
        $("#nIntentos").text("Intentos : " + intentos);
        //Ingresar la combinacion ganadora en colores
        var li = document.createElement("li");
        for (let i = 0; i < arrayElementos.length; i++) {
            let nuevoDiv = document.createElement("div");
            nuevoDiv.classList.add((arrayElementos[i]));
            li.appendChild(nuevoDiv);
        }
        /*-----------------------------------------------------*/
        $("#solucion").text("La respuesta es : ").append(li);

        for (let i = 0; i <= 3; i++) {
            document.getElementById("color" + i).style.color = ""
            document.getElementById("color" + i).style.background = ""
            document.getElementById("color" + i).value = "";
        }

        $("#resultado").text("Has perdido");
    }
    else {
        //Si ingresamos los 4 colores correctos se acaba el juego y se da un aviso al jugador
        if (resultado[0] == 4) {
            $("#partida").prop("disabled", false);
            $("#comprobar").prop("disabled", true);
            $("#resultado").text("Has ganado");
            for (let i = 0; i <= 3; i++) {
                document.getElementById("color" + i).style.color = ""
                document.getElementById("color" + i).style.background = ""
                document.getElementById("color" + i).value = "";
            }
        } else {
            //Sino se han ingresado los 4 colores correctos pues se sigue el juego 
            $("#nIntentos").text("Intentos : " + intentos);
            $("#aciertos").text("Aciertos : " + resultado[0]);
            $("#heridos").text("Heridos : " + resultado[1]);
            for (let i = 0; i <= 3; i++) {
                document.getElementById("color" + i).style.color = ""
                document.getElementById("color" + i).style.background = ""
                document.getElementById("color" + i).value = "";
            }
        }
    }
}

function comprobar() {
    //Array donde la primera posicion son los aciertos 
    //y la segunda son los heridos.
    let resultado = [];
    //Array con la respuesta del usuario
    arrayUsuario = [];
    //Array auxiliar para posteriores comprobaciones 
    let arrayAux = [];
    //Variables necesarias
    let enteroAciertos = 0;
    let heridos = 0;
    
    $("#resultado").text("");

    for (let i = 0; i <= 3; i++) {
        arrayUsuario.push(arrayColores[parseInt($("#color" + i).val())])
        arrayAux.push($("#color" + i).val());
    }

    if (arrayAux[0] == "" || arrayAux[1] == ""
        || arrayAux[2] == "" || arrayAux[3] == "") {
        $("#resultado").text("Complete los 4 campos");
    }
    else {
        if (arrayUsuario[0] == arrayUsuario[1] || arrayUsuario[0] == arrayUsuario[2] || arrayUsuario[0] == arrayUsuario[3] ||
            arrayUsuario[1] == arrayUsuario[0] || arrayUsuario[1] == arrayUsuario[2] || arrayUsuario[1] == arrayUsuario[3] ||
            arrayUsuario[2] == arrayUsuario[0] || arrayUsuario[2] == arrayUsuario[1] || arrayUsuario[2] == arrayUsuario[3] ||
            arrayUsuario[3] == arrayUsuario[0] || arrayUsuario[3] == arrayUsuario[1] || arrayUsuario[3] == arrayUsuario[2]) {
            $("#resultado").text("Hay un campo idéntico");

        }
        else {
            intentos--;
            for (var i = 0; i < arrayElementos.length; i++) {
                for (var j = 0; j < arrayUsuario.length; j++) {
                    if ((arrayElementos[i] == arrayUsuario[j]) && (i == j)) {
                        ///Números de muertos o acertados
                        enteroAciertos++;
                    }
                    else {
                        //Número de heridos
                        if ((arrayElementos[i] == arrayUsuario[j]) && (i != j)) {
                            heridos++;
                        }
                    }
                }
            }
            //Añadir la jugada a la lista de comprobaciones
            var li = document.createElement("li");
            for (let i = 0; i < arrayAux.length; i++) {
                let nuevoDiv = document.createElement("div");
                nuevoDiv.classList.add(arrayColores[parseInt(arrayAux[i])]);
                li.appendChild(nuevoDiv);
            }
            document.getElementById("listaComprobaciones").appendChild(li);
        }
    }

    resultado[0] = enteroAciertos;
    resultado[1] = heridos;

    return resultado;
}

//Función que nos permite cambiar el color de los inputs según el valor que ingresemos
function cambio(valor, dato) {
    var color = arrayColores.indexOf(arrayColores[dato]);
    valor.style.background = arrayColores[dato];
    valor.style.color = arrayColores[dato]
}