
// Declaramos las variables y elementos del dom que vamos a usar en el programa

let alumnos = [];
let arrayNotas = [];

// Guardamos los elementos del DOM en variables para luego usarlas en el programa
let divContenedorInfo = document.getElementById("contenedorInfo");
let cantidadDeNotas = document.getElementById("notas");
let inputNombre = document.getElementById("input1");
let inputPadron = document.getElementById("input2");
let divContainer = document.getElementById("contenedorInputs");
let divClickAlumnos = document.getElementById("clickAlumnos");
let contenedorNotas = document.getElementById("contenedorNotas");
let contenedorBtn = document.getElementById("contenedorBtn");
let contenedorP = document.getElementById("contenedorP");
let botonPrincipal = document.getElementById("btn");
let contenedorAlumnos = document.getElementById("contenedorInfo");
const btnApi = document.getElementById("btn-api");

/** creamos los botones y demas elementos  con los atributos que tendran,
   para luego intrudciorlos en el html */

let botonNotas = document.createElement("button");
botonNotas.type = "button";
botonNotas.id = "btn2";
botonNotas.innerText = "Cargar";
botonNotas.className="btn2";

let parraf = document.createElement("p");

let buscador = document.createElement("input");
buscador.type = "text";

buscador.placeholder = "Busque por nombre.";
buscador.className = "inputBuscador";


let btnPromedioTotal = document.createElement("button");
btnPromedioTotal.type = "button";
btnPromedioTotal.innerText = "Mostrar Promedio Total"
btnPromedioTotal.className = "btnPromedio";

 


    

  /*Funciones que usaremos en el programa */ 
function creadorInput(){
    // en el primer if verificamos que los datos ingresados son validos.  
        if(isNaN (inputNombre.value) && !isNaN(inputPadron.value) && inputPadron.value > 0 && !isNaN(cantidadDeNotas.value) && cantidadDeNotas.value > 0 && checkPadron()){
        for( let i = 0 ; i < (cantidadDeNotas.value) ; i++) {
            //recorremos el for para crear e introducir al DOM los inputs necesarios para la cantidad de notas ingresadas
            let input = document.createElement("input");
            input.type = "text" ;
            input.placeholder = "Nota Numero: "+ (i+1);
            input.id = "nota"+(i);
            input.className = "inputNota";
            contenedorNotas.append(input);  
        }

        //luego del for y despues de los inputs introducimos el boton y cambiamos la clase en el style
        contenedorBtn.append(botonNotas);
        divContainer.className = "container";

    }else{//verificamos si los 3 o alguno de los value ingresado no es valido para avisarle al ususario y vaciarle el input incorrecto
        if( (inputNombre.value == "" || !isNaN(inputNombre.value)) && (isNaN(inputPadron.value) || inputPadron.value == "") && (isNaN(cantidadDeNotas.value) || cantidadDeNotas.value <= 0) ){
            swal({
                title: "Error",
                text : "Ingrese Datos Validos",
                icon: "warning",
                
                className : "alerta",
                button: {
                    className : "botonAlerta",
                    text: "Aceptar",
                },
                
            });

            inputNombre.value = "";
            inputPadron.value = "";
            cantidadDeNotas.value = "";           
        }else{
            if(inputNombre.value == "" || !isNaN(inputNombre.value) ){
                swal({
                    title: "Error",
                    text : "Ingrese un valor valido de Nombre y Apellido",
                    icon: "warning",
                    className : "alerta",
                    button: {
                        className : "botonAlerta",
                        text: "Aceptar",
                    },
                });
                inputNombre.value = "";
            }
            if(isNaN(inputPadron.value) || inputPadron.value == "" || inputPadron.value <= 0){
                swal({
                    title: "Error",
                    text : "Ingrese un valor valido de Padron.",
                    icon: "warning",
                    className : "alerta",
                    button: {
                        className : "botonAlerta",
                        text: "Aceptar",
                    },
                });
                inputPadron.value = "";
            }
            if(isNaN(cantidadDeNotas.value) || cantidadDeNotas.value <= 0){
                swal({
                    title: "Error",
                    text : "Ingrese un valor valido de Cantidad de Notas",
                    icon: "warning",
                    className : "alerta",
                    button: {
                        className : "botonAlerta",
                        text: "Aceptar",
                        
                    },
                });
                cantidadDeNotas.value = "";
            }
        }   
    }
}
function cargaNota(){
   
    let status = 0;
    //como no sabemos cuantos notas van a ingresar, hacemos un for para recorer una por una y sumarlas todas para luego obtener el promedio
    for( let i = 0 ; i < (cantidadDeNotas.value) ; i++) {
        let nota = (document.getElementById("nota"+(i) ));

        //verificamos que los datos sean validos
        if(!isNaN(nota.value) && nota.value >= 0 && nota.value <= 10 && nota.value != ""){
        arrayNotas.push ( parseFloat(nota.value) );
        
        }else{
            nota.value = "";
            arrayNotas = [];
            
            status ++;// esta varibale nos va a decir si tenemos algun valor ingresado invalido
        }        
    }
    if(status == 0){
        // si todos los valores ingresados son validos procedemos a guardarlos en una clase, array y en el localStorage
        alumnos.push(new Alumno(inputNombre.value , inputPadron.value ,arrayNotas, cantidadDeNotas.value));

        let alumnosJSON = JSON.stringify(alumnos);
        localStorage.setItem("alumnos", alumnosJSON);
        
        //volvemos a dejar el dom como estaba, eliminadno las elementes agregados anteriormente y vaciamos el value de los input principales
        for( let i = 0 ; i < (cantidadDeNotas.value) ; i++) {
            let inputDeleter = document.getElementById("nota"+(i));
            inputDeleter.remove();
        }
        botonNotas.remove();
        inputNombre.value = "";
        inputPadron.value = "";
        cantidadDeNotas.value = "";

        arrayNotas = [];
        mostrarOpcionesBusqueda(alumnos); //introducimos al dom lo necesario para el buscador
        //mostrarAlumnos();
        location. reload();
    }else{
        swal({
            title: "Error",
            text : "Ingrese Notas entre cero y diez",
            icon: "warning",
            className : "alerta",
            button: {
                    className : "botonAlerta",
                    text: "Aceptar",
            },
        });
        arrayNotas = [];
    }

   


}
function mostrarOpcionesBusqueda(alumnos){
    parraf.innerText = "La cantidad de alumnos Ingresados es: "+alumnos.length;
        parraf.className = "textoP";
        contenedorP.className = "contenedorP";
        contenedorP.append(parraf);
        contenedorP.append(btnPromedioTotal);
        contenedorP.append(buscador);
        
        divContainer.className = "container1";
}
function buscar(){
    const valor = buscador.value;
    const alumnosFiltrados = alumnos.filter( (alumno) => {
        const name = `${alumno.nombre}`.toLowerCase();
        return name.includes(valor.toLowerCase());
    } );
  
    mostrarAlumnosStorage(alumnosFiltrados);
    
}
/**
 * 
 * @returns 
 */
function promedioTotal(){
    let totalNotas = 0;
    let totalcantidadDeNotas = 0;

    for(let i = 0; i< alumnos.length; i++){
        for(let j = 0; j < alumnos[i].notas.length ; j++){    
            totalNotas = totalNotas + alumnos[i].notas[j]              
        }    
    }
    for(let i = 0; i< alumnos.length; i++){
        totalcantidadDeNotas = totalcantidadDeNotas + parseInt(alumnos[i].nDeNotas);
        
        
    }
    swal({
        title: "Promedio Total de Alumnos.",
        text : "El promedio total es: "+((totalNotas) / (totalcantidadDeNotas)).toFixed(1),
        icon: "info",
        className : "alerta",
        button: {
            className : "botonAlerta",
            text: "Aceptar",
        },
    });
}
/**
 * 
 * @param {*} Array 
 */
function mostrarAlumnosStorage(Array){
    let divContenedorInfo = document.getElementById("contenedorInfo");
    divContenedorInfo.innerHTML = `<div class="info">
    <p class="tituloAlumnos">Nombres y Apellido: </p>
    <p class="tituloAlumnos">Padron: </p>
    <p class="tituloAlumnos">Promedio:  </p>
</div>`;
    let sumaNotas = 0;
    let prom = 0;
    
    let conteo = 0;
       
    for(let i = 0; i < Array.length ; i++){
        let divAlumnos = document.createElement("div");
        let botonMostrarNotas = document.createElement("button");
        let botonRemove = document.createElement("button");
        botonMostrarNotas.type ="button";
        botonMostrarNotas.innerText="Mostrar Notas";
        botonMostrarNotas.className="botonalumnos";              
        botonRemove.type ="button";
        botonRemove.innerText = "Eliminar Alumno";
        botonRemove.className ="botonalumnos";
        
        let p1 = document.createElement("p");
        let p2 = document.createElement("p");
        let p3 = document.createElement("p");
        let pasador= 0;
        divAlumnos.className = "alumnoIndividual";
        p1.innerText = Array[i].nombre;
        p2.innerText = Array[i].padron;
        for(let j = 0; j < Array[i].notas.length ; j++){    
            sumaNotas = sumaNotas + Array[i].notas[j]              
        }
        prom = (sumaNotas / Array[i].nDeNotas);
        p3.innerText =  prom.toFixed(1);
        divAlumnos.append(p1, p2, p3);
        divContenedorInfo.append(divAlumnos);
        sumaNotas = 0;


        let mensaje = [];    
        let clickCounter = 0;
        divAlumnos.addEventListener("click",() => {
            if (clickCounter==0){
                divAlumnos.className = "alumnoIndividual2";
                divAlumnos.append(botonMostrarNotas, botonRemove);
                clickCounter = 1;
                botonMostrarNotas.className="botonalumnos";
            }else{
                divAlumnos.className = "alumnoIndividual";
                botonMostrarNotas.remove();            
                botonRemove.remove();
                clickCounter = 0; 
                conteo = 0;   
            }
        }); 
        botonMostrarNotas.addEventListener("click",()=>{
            if (conteo == 0){
                mensaje = [...Array[i].notas];
                swal({
                    title: "Notas Cargadas.",
                    text : "Las notas de "+ Array[i].nombre +" son: "+mensaje.join("  ,  "),
                    icon: "info",
                    className : "alerta",
                    button: {
                        className : "botonAlerta",
                        text : "Aceptar",
                    },
                });
                
                conteo ++;                
            }
        });
        botonMostrarNotas.addEventListener("mouseover",()=>{
            botonMostrarNotas.className="botonalumnos1";
        });

        botonMostrarNotas.addEventListener("mouseout", ()=>{
            botonMostrarNotas.className="botonalumnos";
        });
        botonRemove.addEventListener("mouseover",()=>{
            botonRemove.className="botonalumnos1";
        });

        botonRemove.addEventListener("mouseout", ()=>{
            botonRemove.className="botonalumnos";
        });
            
        botonRemove.addEventListener("click",()=>{
            if (buscador.value != ""){
                removerAlumnos(Array[i].padron);
            }else{
                Array.splice(i,1);
                let alumnosJSON = JSON.stringify(Array);
                localStorage.setItem("alumnos", alumnosJSON);
                location.reload();
            }      
        });    
    } 
    divContenedorInfo.className = "contenedorInfo";
}

function removerAlumnos(x){
    for(let j = 0; j<alumnos.length ;j++){
        if(alumnos[j].padron === x ){
            alumnos.splice(j, 1);
            let alumnosJSON = JSON.stringify(alumnos);
            localStorage.setItem("alumnos", alumnosJSON);
            divContenedorInfo.className = "contenedorInfo2";
            location.reload();
        }        
    }  
}


function checkPadron(){
    let counter = 0;
    for(let i = 0; i< alumnos.length; i++){
        if(inputPadron.value == alumnos[i].padron){
            swal({
                title: "Coincidencia de Padron.",
                text : "Ya hay un alumno con ese padron",
                icon: "warning",
                className : "alerta",
                button: {
                    className : "botonAlerta",
                    text: "Aceptar",
                },
                
            });  
            
            counter ++;
            return false;
        } 
    }    
    if (counter == 0){
        return true;
    }
    counter = 0;   
}

class Alumno{
    constructor(nombreYApellido, padron, nota, nDeNotas ){
        this.nombre = nombreYApellido;
        this.padron = padron;
        this.notas = nota;
        this.nDeNotas = nDeNotas;     
    }
}

/**

 */
async function alumnosApi() {   
        const resp = await fetch("https://rickandmortyapi.com/api/character")
        const data = await resp.json();
        const alumnosapi = [];
        const padrones = alumnos.map ((el) => el.padron);
        padrones.sort ((a, b) => b - a);
        

        const array = data.results
        if (alumnos.length==0){
            array.forEach((persona) => {
                const notasAleatorias = [(Math.random() * 10),(Math.random() * 10),(Math.random() * 10)];
                alumnosapi.push(new Alumno(persona.name ,persona.id,    notasAleatorias, 3));
            });
        }else{
            array.forEach((persona) => {
                const notasAleatorias = [(Math.random() * 10),(Math.random() * 10),(Math.random() * 10)];
                alumnosapi.push(new Alumno(persona.name , (parseInt(persona.id)  + parseInt(padrones[0])  ),    notasAleatorias, 3)); 

            });
        }
        const alumnosFull = alumnos.concat(alumnosapi);
        console.log(alumnosFull)
        mostrarAlumnosStorage(alumnosFull);
        console.log(alumnos)
        mostrarOpcionesBusqueda(alumnosFull);
        let alumnosJSON = JSON.stringify(alumnosFull);
        localStorage.setItem("alumnos", alumnosJSON);
        location. reload();
}

     /*Vemos si tenemos alumnos guardados en el storage
            para cargarlos al cargar la pagina*/        
let storageStatus = localStorage.getItem("alumnos");
if (storageStatus != null){
    alumnos = JSON.parse(storageStatus);
    mostrarAlumnosStorage(alumnos);
    mostrarOpcionesBusqueda(alumnos);   
}

             /* Eventos del DOM*/

botonPrincipal.addEventListener("click", creadorInput);

botonPrincipal.addEventListener("mouseover", () => {
    botonPrincipal.className = "button1";    
});

botonPrincipal.addEventListener("mouseout", () => {
    botonPrincipal.className = "button";   
});

botonNotas.addEventListener("click",  cargaNota);

botonNotas.addEventListener("mouseover", () => {
    botonNotas.className = "btn21";     
});

botonNotas.addEventListener("mouseout", () => {
    botonNotas.className = "btn2";     
});

btnPromedioTotal.addEventListener("click", promedioTotal);

btnPromedioTotal.addEventListener("mouseover", () => {
    btnPromedioTotal.className = "btnPromedio1";   
});

btnPromedioTotal.addEventListener("mouseout", () => {
    btnPromedioTotal.className = "btnPromedio";   
});

btnApi.addEventListener("mouseover", () => {
    btnApi.className = "button1";    
});

btnApi.addEventListener("mouseout", () => {
    btnApi.className = "button";   
});
let counterApi = localStorage.getItem("checkApi");
console.log(counterApi)
btnApi.addEventListener("click", () => {
    if(counterApi == null){
        counterApi = 1;
        let checkApi = JSON.stringify(counterApi);
        localStorage.setItem("checkApi", checkApi);
        alumnosApi();
        
    }else{
        swal({
            title: "Error",
            text : "Solo puedes cargar una vez los alumos de la Api",
            icon: "warning",
            className : "alerta",
            button: {
                    className : "botonAlerta",
                    text: "Aceptar",
            },
        });
    }
});





buscador.addEventListener("input", buscar);

