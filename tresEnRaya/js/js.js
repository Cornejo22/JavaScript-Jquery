
let turno = 1;
var todo = document.querySelectorAll("td");

/**Función principal que usa otras funciones */
function clic_cambia(imagen){ 
    var contadorTodo = 0;  
    turnos(imagen);
    compruebaFilas();
    compruebaColumnas();
    compruebaDiagonales();

   /**Función que comprueba que haya un empate */
    for (let index = 0; index < todo.length; index++) {
       if(todo[index].classList.contains("equis") || todo[index].classList.contains("circulo")){
           contadorTodo++;
       }
    }

    if(contadorTodo == 9){
        for (let index = 0; index < todo.length; index++) {
            todo[index].onclick=null;
        }
        
        document.getElementById("estilo").style.backgroundColor="#090d00";
        document.getElementById("estilo").style.color="rgba(255, 255, 255, 0.25)";
        document.getElementById("ganador").innerText = "Hay un empate";
        
    }
}

/**Función que coje el id de cada td y nos muestra la imagen dependiendo
 * del turno en el que estemos
 */
function turnos(id){

    var tipoImg = document.getElementById(id);
    if(turno %2 == 0){
        tipoImg.childNodes[1].style="display:block";
        tipoImg.onclick=null;
        tipoImg.className="circulo";
        
    }
    else{
        tipoImg.childNodes[2].style="display:block";
        tipoImg.onclick=null;  
        tipoImg.className="equis";     
    }
    turno++;
}

/**Función que comprueba si hay ganador */
function quienGano(clase){

    if(clase == 'circulo'){
        
        var desactivarOnClick = document.querySelectorAll('td');
        for (let index = 0; index < desactivarOnClick.length; index++) {
           desactivarOnClick[index].onclick=null;
        }
        
        document.getElementById("estilo").style.backgroundColor="#090d00";
        document.getElementById("estilo").style.color="rgba(255, 255, 255, 0.25)";
        document.getElementById("ganador").innerText = "Ha ganado el jugador 2";
        
    }
    else{
        if(clase == "equis"){
            var desactivarOnClick = document.querySelectorAll('td');
            for (let index = 0; index < desactivarOnClick.length; index++) {
                desactivarOnClick[index].onclick=null;
            }
            document.getElementById("estilo").style.backgroundColor="#090d00";
            document.getElementById("estilo").style.color="rgba(255, 255, 255, 0.25)";
            document.getElementById("ganador").innerText = "Ha ganado el jugador 1";
        }
    }
}

/**Función que comprueba filas */
function compruebaFilas(){
   var arrayTd1 = [document.getElementById(1).className,document.getElementById(2).className,document.getElementById(3).className];
   var arrayTd2 = [document.getElementById(4).className,document.getElementById(5).className,document.getElementById(6).className];
   var arrayTd3 = [document.getElementById(7).className,document.getElementById(8).className,document.getElementById(9).className];
   
   var contador = 0;
  if(!arrayTd1.includes(''))
  {
    if(arrayTd1.includes('circulo')){
        for (let index = 0; index < arrayTd1.length; index++){
            if(arrayTd1[index] == 'circulo'){
                contador++;
            }
        }
        if(contador == 3){
            ganador = "circulo";
            quienGano(ganador);
        }
    }
    else{
        for (let index = 0; index < arrayTd1.length; index++) {
            if(arrayTd1[index] == 'equis'){
                contador++;
            }
        }
        if(contador == 3){
            ganador = "equis";
            quienGano(ganador);
        }
    }
  }
  contador = 0;
  if(!arrayTd2.includes(''))
  {
    if(arrayTd2.includes('circulo')){
        for (let index = 0; index < arrayTd2.length; index++) {
            if(arrayTd2[index] == 'circulo'){
                contador++;
            }
        }
        if(contador == 3){
            ganador='circulo';
            quienGano('circulo');
        }
    }
    else{
        for (let index = 0; index < arrayTd2.length; index++) {
            if(arrayTd2[index] == 'equis'){
                contador++;
            }
        }
        if(contador == 3){
            ganador='equis';
           quienGano(ganador);
        }
    }
  }
  contador = 0;
  if(!arrayTd3.includes(''))
  {
    if(arrayTd3.includes('circulo')){
        for (let index = 0; index < arrayTd3.length; index++) {
            if(arrayTd3[index] == 'circulo'){
                contador++;
            }
        }
        if(contador == 3){
            ganador='circulo';
            quienGano(ganador);
        }
    }
    else{
        for (let index = 0; index < arrayTd3.length; index++) {
            if(arrayTd3[index] == 'equis'){
                contador++;
            }
        }
        if(contador == 3){
            ganador='equis';
           quienGano(ganador);
        }
    }
  }   
}

/**Función que comprueba las columnas */
function compruebaColumnas(){
    var arrayTd1 = [document.getElementById(1).className,document.getElementById(4).className,document.getElementById(7).className];
    var arrayTd2 = [document.getElementById(2).className,document.getElementById(5).className,document.getElementById(8).className];
    var arrayTd3 = [document.getElementById(3).className,document.getElementById(6).className,document.getElementById(9).className];
    var contador=0;
    if(!arrayTd1.includes(''))
    {
      if(arrayTd1.includes('circulo')){
          for (let index = 0; index < arrayTd1.length; index++) {
              if(arrayTd1[index] == 'circulo'){
                  contador++;
              }
          }
          if(contador == 3){
              ganador="circulo"
              quienGano(ganador);
          }
      }
      else{
          for (let index = 0; index < arrayTd1.length; index++) {
              if(arrayTd1[index] == 'equis'){
                  contador++;
              }
          }
          if(contador == 3){
              ganador="equis"
             quienGano(ganador);
          }
      }
    }

    contador=0;
    if(!arrayTd2.includes(''))
    {
      if(arrayTd2.includes('circulo')){
          for (let index = 0; index < arrayTd2.length; index++) {
              if(arrayTd2[index] == 'circulo'){
                  contador++;
              }
          }
          if(contador == 3){
              ganador="circulo";
              quienGano(ganador);
          }
      }
      else{
          for (let index = 0; index < arrayTd2.length; index++) {
              if(arrayTd2[index] == 'equis'){
                  contador++;
              }
          }
          if(contador == 3){
              ganador="equis";
             quienGano(ganador);
          }
      }
    }

    contador=0;
    if(!arrayTd3.includes(''))
    {
      if(arrayTd3.includes('circulo')){
          for (let index = 0; index < arrayTd3.length; index++) {
              if(arrayTd3[index] == 'circulo'){
                  contador++;
              }
          }
          if(contador == 3){
              ganador="circulo";
              quienGano(ganador);
          }
      }
      else{
          for (let index = 0; index < arrayTd3.length; index++) {
              if(arrayTd3[index] == 'equis'){
                  contador++;
              }
          }
          if(contador == 3){
              ganador="equis";
             quienGano(ganador);
          }
      }
    }
}

/**Función que comprueba las columnas */
function compruebaDiagonales(){
    var arrayTd1 = [document.getElementById(1).className,document.getElementById(5).className,document.getElementById(9).className];
    var arrayTd2 = [document.getElementById(3).className,document.getElementById(5).className,document.getElementById(7).className];
    var contador=0;
    if(!arrayTd1.includes(''))
    {
      if(arrayTd1.includes('circulo')){
          for (let index = 0; index < arrayTd1.length; index++) {
              if(arrayTd1[index] == 'circulo'){
                  contador++;
              }
          }
          if(contador == 3){
              ganador="circulo";
              quienGano(ganador);
          }
      }
      else{
          for (let index = 0; index < arrayTd1.length; index++) {
              if(arrayTd1[index] == 'equis'){
                  contador++;
              }
          }
          if(contador == 3){
              ganador="equis";
             quienGano(ganador);
          }
      }
    }
    contador=0;
    if(!arrayTd2.includes(''))
    {
      if(arrayTd2.includes('circulo')){
          for (let index = 0; index < arrayTd2.length; index++) {
              if(arrayTd2[index] == 'circulo'){
                  contador++;
              }
          }
          if(contador == 3){
              ganador="circulo";
              quienGano(ganador);
          }
      }
      else{
          for (let index = 0; index < arrayTd2.length; index++) {
              if(arrayTd2[index] == 'equis'){
                  contador++;
              }
          }
          if(contador == 3){
            ganador="equis";
            quienGano(ganador);
          }
      }
    }
  
}
