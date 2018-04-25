var jsonPalabras = [];
var arrayPalabrasTamanno = [];
var iControlTamanno = 10;
var posicionesLetras = [];

$(document).ready(function () {
    //Añadir a la var jsonpalabra los datos del json de Juana.
    $.get("logogrifo.json", function (data, status, xhr) {
        try {
            jsonPalabras = JSON.parse(data);
        } catch (error) {
            jsonPalabras = data;
        }

        cargarDatos(jsonPalabras);
        annadirLetras(arrayPalabrasTamanno);
        genera_tabla();
        $("button#comprueba").click(function () {
            $(".input-class").each(function(){ 
                var valorInput = $(this).val().toUpperCase();
                var iD = $(this).attr("id");
                if($("input:enabled").length == 0){
                    $("#comprueba").attr("disabled","disabled");
                    $("#nPartida").removeAttr("disabled");
                }
                else{
                    if(iD == posicionesLetras.indexOf(valorInput)){
                        $(this).val(valorInput);
                        $(this).css("border-color","blue");
                        $(this).attr("disabled","disabled");
                        rellenar(iD,valorInput);
                    }                  
                } 
            });
        });

        $("button#nPartida").click(function(){
            location.reload();
        });
    });
});

function cargarDatos(palabras) {
    //Le daremos un tamaño predefinido a nuestro array, crearemos un array aux para incluir las 
    //palabras de cada tamaño provisionalmente.
    arrayPalabrasTamanno.length = 0;
    let auxPalabras = [];
    while (arrayPalabrasTamanno.length < 7) {
        let arrayAux = [];
        // auxPalabras = palabras.filter(function (palabras) {
        //     return palabras.palabra.length === iControlTamanno;
        // iControlTamanno--;});
        for (let index = 0; index < palabras.length; index++) {
            if (palabras[index].palabra.length == iControlTamanno) {
                arrayAux.push(palabras[index].palabra);
            }
        }
        iControlTamanno--;

        //Conseguir palabra aleatoria de tu arrayAux e incluirla en tu arrayPorTamaños
        var aleatorio = Math.floor(Math.random() * (arrayAux.length));
        var seleccion = arrayAux[aleatorio];
        arrayPalabrasTamanno.push(seleccion);
    }
}

function annadirLetras(arrayPalabrasTamanno) {
    //auxPalabra sera cada palabra de nuestra array con todas las palabras
    //esto nos permitirá comprobar que en nuestro array de posicionesLetras no este la letra
    // si la letra esta en este array pasaremos a la siguiente letra y si no lo esta pues la introducimos
    // y asi con todas las palabras.
    var auxPalabra;
    for (let index = 0; index < arrayPalabrasTamanno.length; index++) {
        auxPalabra = arrayPalabrasTamanno[index];
        for (let index2 = 0; index2 < auxPalabra.length; index2++) {
            if (posicionesLetras.indexOf(auxPalabra[index2]) === -1) {
                posicionesLetras.push(auxPalabra[index2]);
            }
        }
    }
}

function genera_tabla() {
    // Obtener la referencia del elemento body
    var body = document.getElementsByTagName("body")[0];

    // Crea un elemento <table> y un elemento <tbody>
    var tabla = document.createElement("table");
    var tblBody = document.createElement("tbody");

    // Crea las celdas
    for (var i = 0; i < arrayPalabrasTamanno.length; i++) {
        // Crea las hileras de la tabla
        var hilera = document.createElement("tr");
        var auxPalabra = arrayPalabrasTamanno[i];

        for (var j = 0; j < auxPalabra.length; j++) {
            // Crea un elemento <td> y un input de texto, haz que el input de
            // texto sea el contenido de <td>, ubica el elemento <td> al final
            // de la hilera de la tabla
            var pos = posicionesLetras.indexOf(auxPalabra[j]);
            var celda = document.createElement("td");
            var input = document.createElement("input");
            celda.innerHTML = pos;
            input.setAttribute("id", pos);
            input.setAttribute("maxlength", 1);
            input.setAttribute("type", "text");
            input.setAttribute("class", "input-class");
            celda.appendChild(input);
            hilera.appendChild(celda);
        }
        var tr = document.createElement("tr");
        var definicion = buscarDefinicion(auxPalabra);
        var parrafoDefinicion = document.createElement("td");
        parrafoDefinicion.setAttribute("id","definicion");
        parrafoDefinicion.innerHTML = "Definición : " + definicion;
        tr.appendChild(parrafoDefinicion);
        //hilera.appendChild(parrafoDefinicion);
        // agrega la hilera al final de la tabla (al final del elemento tblbody)
        tblBody.appendChild(hilera);
        tblBody.appendChild(tr);
    }
    // posiciona el <tbody> debajo del elemento <table>
    tabla.appendChild(tblBody);
    // appends <table> into <body>
    body.appendChild(tabla);
    var button = document.createElement("button");
    button.innerText = "Comprueba.";
    button.setAttribute("id","comprueba");
    body.appendChild(button);
    $("body").append($("<button></button>").text("Nuevo Juego.").attr("id","nPartida").attr("disabled","true"));
}


function buscarDefinicion(palabraAux) {
    //Buscaremos la definición de la palabra seleccionada para insertarla posteriormente en nuestro div
    var definicion = "";

    for (let index = 0; index < jsonPalabras.length; index++) {
        if (jsonPalabras[index].palabra == palabraAux) {
            definicion = jsonPalabras[index].definicion;
        }
    }

    return definicion;
}

function rellenar(id,valorInput){
    var id2 = id;
    var valor = valorInput;

    $(".input-class").each(function(){
        if($(this).attr("id") == id2 ){
            $(this).val(valor);
            $(this).css("border-color","blue");
            $(this).attr("disabled","disabled");
        }
    })
}