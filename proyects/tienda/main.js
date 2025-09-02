// creo las variable y elemtos que usare a lo largo del codigo, algunos para luego introducirlos al DOM
let productos = [];
const divRowDflex = document.createElement("div");
divRowDflex.className = "row d-flex divproblematico"; 
const divDisplayProductos = document.createElement("div");
divDisplayProductos.className = "container-fluid displayProductos";
const section = document.createElement("section");
const categorias = document.createElement("div");
categorias.className = "categorias";
categorias.id= "categorias";

const categoriasPlegadas = document.createElement("div");
categoriasPlegadas.className = "categoriasPlegadas";

const btnCategorias = document.createElement("span");
btnCategorias.className = "btn-cat";
btnCategorias.id = "btn-cat";
btnCategorias.innerHTML = `<i class="fa-solid fa-angles-left">`;

const selectCat = document.createElement("select");
selectCat.className = "selector";
selectCat.innerHTML = `
<option selected value="0" >Ordenar</option>`;


const ulCat = document.createElement("ul");
    ulCat.className="cat";
    ulCat.innerHTML = `
    <h5 class="cat-titule">Categorias</h5>`;

const divShowProduct = document.createElement("div");
    divShowProduct.className = "showProducts row";

const  divProductosScreen = document.createElement("div");
divProductosScreen.className = "productosScreen";

// Puedo agregar o quitar categorias desde aca
const categoriasArray = ["Esmaltado", "Secado", "Limado", "Estampado"];
const options = ["Menor Precio", "Mayor Precio"]

// me guardo los elementos del DOM a utilizar
const btnInicio = document.getElementById("btnInicio");
const btnProducto = document.getElementById("btnProductos");
const divDistintosContainers =document.getElementById("distintosContainers");
const carousel = document.getElementById("carouselExampleIndicators");
const carritoDisplay = document.getElementById("carritoDisplay");
const carritoIcono = document.getElementById("carritoIcono");
const finalizarCompra = document.getElementById("finalizarCompra");
const inputBuscar = document.getElementById("inputBuscar");
const btnBuscar = document.getElementById("btnBuscar");
const navItemProducto = document.getElementById("navItemProductos");
const navItemEsmalatado= document.getElementById("btnEsmaltado");
const navItemSecado = document.getElementById("btnSecado");
const navItemLimado = document.getElementById("btnLimado");
const navItemEstampado = document.getElementById("btnEstampado");
const btnMasVendidos = document.getElementById("masVendidos")
const btnRecomendados = document.getElementById("btnRecomendados")



function buscar(arrays){
    let valor = inputBuscar.value
    
    let productosFiltradosNombres = arrays.filter( (el) => {
        const name = `${el.nombre}`.toLowerCase();
        
        return name.includes(valor.toLowerCase());
    } );
    
    renderProductosHTML(productosFiltradosNombres, false);
}

function crearSeccionProductos(arrays){

    
    divDisplayProductos.innerHTML = "";
    categorias.innerHTML = "";
    ulCat.innerHTML="";


    btnInicio.className = "nav-link";
    navItemProducto.className = "nav-link active dropdown-toggle";

    let storageStatus = localStorage.getItem("productos");
    if(storageStatus != null && storageStatus.length >0){
        arrays = JSON.parse(storageStatus);
        
    }

    options.forEach((opt) => {
        const optCat = document.createElement("option");
        optCat.value = parseInt(options.indexOf(opt)) + 1;
        
        optCat.innerText = opt;
        selectCat.append(optCat);

    });

    
    selectCat.addEventListener("change", ()=>{
        
        if(selectCat.value == 1){
            //ordenar por menor precio
            const porudctosOrdenadosMenor = [...arrays];
            porudctosOrdenadosMenor.sort((a,b)=>(a.precio - b.precio));
            renderProductosHTML(porudctosOrdenadosMenor, false);
            console.log(porudctosOrdenadosMenor);
        }else if(selectCat.value == 2){
            const porudctosOrdenadosMayor = [...arrays];
            porudctosOrdenadosMayor.sort((a,b)=>(b.precio - a.precio));
            renderProductosHTML(porudctosOrdenadosMayor, false);
            //ordenar por mayor precio
        }
    });
    
    
    categoriasArray.forEach((cat) =>{
        const liCat = document.createElement("li");
        const aCat = document.createElement("a");
        aCat.href = "#";
        aCat.innerText = cat;
        liCat.append(aCat);
        ulCat.append(liCat);

        aCat.addEventListener("click", ()=>{
            filtrarPorCategoria(arrays, cat) 
        });
    });

    categoriasPlegadas.append(btnCategorias); 
    console.log(btnCategorias);
    categoriasPlegadas.append(btnCategorias, selectCat, ulCat);
        
    categorias.append(categoriasPlegadas);
    divRowDflex.append(categorias);
    divProductosScreen.append(divShowProduct);
    divRowDflex.append(divProductosScreen);
    
    let counterClick1 = 0;
    btnCategorias.addEventListener("click", () => {
        if(counterClick1 == 0){
            categorias.className = "categorias1";
            btnCategorias.className = "btn-cat1";
            counterClick1 = 1 ;
        }else if(counterClick1 == 1){
            categorias.className = "categorias";
            btnCategorias.className = "btn-cat";
            counterClick1 = 0;
        } 
    });
    
    divDisplayProductos.append(divRowDflex);
    section.append(divDisplayProductos);
    document.body.append(section);
}

function renderProductosHTML(arrays, saltarstorage){
    divShowProduct.innerHTML = "";
    let storageStatus = localStorage.getItem("productos");
    if(storageStatus != null && storageStatus.length >0 && saltarstorage == true ){
        arrays = JSON.parse(storageStatus);
        
    }
    
    selectCat.addEventListener("change", ()=>{
        
        if(selectCat.value == 1){
            //ordenar por menor precio            
            const porudctosOrdenadosMenor = [...arrays];
            porudctosOrdenadosMenor.sort((a,b)=>(a.precio - b.precio));
            renderProductosHTML(porudctosOrdenadosMenor, false);
            console.log(porudctosOrdenadosMenor, false);
        }else if(selectCat.value == 2){
            const porudctosOrdenadosMayor = [...arrays];
            porudctosOrdenadosMayor.sort((a,b)=>(b.precio - a.precio));
            renderProductosHTML(porudctosOrdenadosMayor, false);
            //ordenar por mayor precio

        }
    });

    for(let i = 0; i < arrays.length ; i++){
        const divCardContainer = document.createElement("div");
        divCardContainer.className = "col-xl-4 col-lg-6 col-md-6 col-sm-12 ";
        const divCard = document.createElement("div");
        divCard.style = "width: 100%;";
        divCard.className ="card containerCat";

        const btnCarrito = document.createElement("a");
        btnCarrito.className = "btn btn-lg btn-block btnProductos";
        btnCarrito.innerText = "Añadir al carrito";
        
        const divCardBody = document.createElement("div");
        divCardBody.className = "card-body";
        divCardBody.innerHTML = `
        <img src=${arrays[i].img}  class="card-img-top" alt="...">
        <h5 class="card-title"> ${arrays[i].nombre} </h5>
        <p class="card-text"> ${arrays[i].descripcion} \n Precio: $${arrays[i].precio} </p>`;

        divCardBody.append(btnCarrito);
        divCard.append(divCardBody);
        divCardContainer.append(divCard);
        divShowProduct.append(divCardContainer);
    
        btnCarrito.addEventListener("click", () => {
            if(arrays[i].stock>0){
                arrays[i].unidadesCarrito ++;
                arrays[i].stock --;
                let parametroJSON = JSON.stringify(arrays);
                localStorage.setItem("productos", parametroJSON);
                renderCarrito(productos);
            }else{
                swal({
                    title: "Out Of Stock",
                    text : "No hay mas stock de ese articulo",
                    icon: "warning",
                    className : "alerta",
                    button: {
                        className : "botonAlerta",
                        text: "Aceptar",
                    },
                    
                });
            }
        }); 
    }
}

/**
 * funcion que filtra el array de productos, con los que concide con la categoria pasada como parametro y los vuelve a renderizar.
 * @param {*} array de productos
 * @param {*} cat egoria para filtrar 
 */
function filtrarPorCategoria(array, cat){

    let productosFiltradosCategorias = productos.filter((el) => el.categoria == `${cat.toLocaleLowerCase()}`);
    renderProductosHTML(productosFiltradosCategorias, false);
    console.log("pase x el filtro")
}

/**
 * 
 * @param {*} parametro array de productos que deseo cargar y mostrar en el html
 */
function renderCarrito(parametro){
    carritoDisplay.innerHTML="";

    let storageStatus = localStorage.getItem("productos");
    if(storageStatus != null && storageStatus.length >0){
        parametro = JSON.parse(storageStatus);
    }else{
        let parametroJSON = JSON.stringify(parametro);
        localStorage.setItem("productos", parametroJSON);
    }
    
    for(let i = 0; i<parametro.length ; i++){
        const divRow=document.createElement("div");
        divRow.className = "row align-items-center producto";
    
        const divCol9 = document.createElement("div");
        divCol9.className = "col-9 tituloProducto ";
        divCol9.innerHTML = `<p> <strong>${parametro[i].nombre}</strong></p>`
        const divCol3 = document.createElement("div");
        divCol3.className = "col-3 btncantidad";

        const aMin = document.createElement("a");
        const aMax =  document.createElement("a");
        const numCarrito = document.createElement("span");
        if (parametro[i].unidadesCarrito == 1){
            aMin.innerHTML = '<i class="fa-solid fa-trash"></i>';
        }else{
            aMin.innerHTML = '<i class="fa-solid fa-minus"></i>';
        }
        numCarrito.innerHTML = `<strong> ${parametro[i].unidadesCarrito} </strong> `; 
        aMax.innerHTML = '<i class="fa-solid fa-plus"></i>';

        divCol3.append(aMin, numCarrito , aMax);
        divRow.append(divCol9 , divCol3);
        if(parametro[i].unidadesCarrito > 0 ){
            carritoDisplay.append(divRow);}
        
        

        /*      EVENTOS DE LOS PRODUCTOS EN EL CARRITO       */

        aMax.addEventListener("click", () => {
            
            if(parametro[i].stock>0){
                parametro[i].stock--;
                parametro[i].unidadesCarrito ++;
                aMin.innerHTML = '<i class="fa-solid fa-minus"></i>';
                let parametroJSON = JSON.stringify(parametro);
                localStorage.setItem("productos", parametroJSON);
                
            }else{
                swal({
                    title: "Out Of Stock",
                    text : "No hay mas stock de ese articulo",
                    icon: "warning",
                    className : "alerta",
                    button: {
                        className : "botonAlerta",
                        text: "Aceptar",
                    },
                    
                });
                
            }

            numCarrito.innerHTML = `<strong> ${parametro[i].unidadesCarrito} </strong> `;
            calcularTotal(parametro);
            
            
            
        }); 
        
        aMin.addEventListener("click", () => {
            parametro[i].stock ++;
            parametro[i].unidadesCarrito -- ;
            if (parametro[i].unidadesCarrito == 1){
                    aMin.innerHTML = '<i class="fa-solid fa-trash"></i>';
            }else if(parametro[i].unidadesCarrito == 0){
                    divRow.remove();
                   
            }
            let parametroJSON = JSON.stringify(parametro);
            localStorage.setItem("productos", parametroJSON);
            numCarrito.innerHTML = `<strong> ${parametro[i].unidadesCarrito} </strong> `;
            calcularTotal(parametro);
        });
                
    }
    calcularTotal(parametro);
    
}
function calcularTotal(parametros){
    let total = 0;
    const btnFinalizarCompra= document.getElementById("btnFinalizarCompra");
    const pSubtotal = document.getElementById("subtotal");
    console.log(total);
    parametros.forEach((el)=>{
        total =((el.precio) * (el.unidadesCarrito)) + total;
    });
    pSubtotal.innerText = `Subtotal: $${total}`;
}
/**
 * funcion que busca los productos con un fetch y llama a la funcion para renderizarlos
 * @param {*} filtro ya que la funcion es ascincronica, en ella mismo paso como parametro y si quiero filtrar o buscar para realizarlo en este espacio
 */
async function buscarProductosJson(filtro){
    const resp = await fetch("productos.json")
    const data = await resp.json();
    let storageStatus = localStorage.getItem("productos");
    if(storageStatus != null && storageStatus.length >0){
        productos = JSON.parse(storageStatus);
        
    }else{
        productos = data; 
    }
    productos = data;
    if(filtro == " "){
        
        renderProductosHTML(productos, true);
        renderCarrito(productos);   
    }else if(filtro == "buscar"){
        buscar(productos);
    }
    else{
        filtrarPorCategoria(productos, filtro);
    }
}

let storageStatus = localStorage.getItem("productos");
    if(storageStatus != null && storageStatus.length >0){
        productos = JSON.parse(storageStatus);
        renderCarrito(productos);
    }
    /*                EVENTOS DEL DOM                 */
let counterClick = 0;
carritoIcono.addEventListener("click", () => {
    
    if(counterClick == 0){
        carritoDisplay.className = "carrito-display";
        finalizarCompra.className = "outlineCarritoDisplay";
        counterClick = 1 ;
    }else if(counterClick == 1){

        carritoDisplay.className = "carrito-display1";
        finalizarCompra.className = "outlineCarritoDisplay1";
        counterClick = 0;
    } 
});

btnProducto.addEventListener("click", () => { 

    if(navItemProducto.className == "nav-link active dropdown-toggle" || navItemProducto.className == "nav-link active dropdown-toggle show"){
        renderProductosHTML(productos, true);
    }else{

    
    divDistintosContainers.remove();
    carousel.remove();
    buscarProductosJson(" ");
    crearSeccionProductos(productos);
    } 
    //renderProductosHTML(productos);
});

btnBuscar.addEventListener("click", (event)=>{
    event.preventDefault();
    
    
    if(inputBuscar.value != ""){
        if(btnInicio.className =="nav-link active"){
            
            divDistintosContainers.remove();
            carousel.remove();
            buscarProductosJson("buscar");
            crearSeccionProductos(productos)
            
        }
        else if(navItemProducto.className == "nav-link active dropdown-toggle" || navItemProducto.className == "nav-link active dropdown-toggle show" ){
            
        buscar(productos);

        }
    }
});

navItemEsmalatado.addEventListener("click", () => {
    if(btnInicio.className =="nav-link active"){
            
        divDistintosContainers.remove();
        carousel.remove();
        buscarProductosJson("esmaltado");
        crearSeccionProductos(productos);
                
    }
    filtrarPorCategoria(productos, "esmaltado");
    
});
navItemSecado.addEventListener("click", () => {
    if(btnInicio.className =="nav-link active"){
            
        divDistintosContainers.remove();
        carousel.remove();
        buscarProductosJson("secado");
        crearSeccionProductos(productos);
                
    }
    filtrarPorCategoria(productos, "secado");
});
navItemLimado .addEventListener("click", () => {
    if(btnInicio.className =="nav-link active"){
            
        divDistintosContainers.remove();
        carousel.remove();
        buscarProductosJson("limado");
        crearSeccionProductos(productos);
                
    }
    filtrarPorCategoria(productos, "limado");
});
navItemEstampado.addEventListener("click", () => {
    if(btnInicio.className =="nav-link active"){
            
        divDistintosContainers.remove();
        carousel.remove();
        buscarProductosJson("estampado");
        crearSeccionProductos(productos);
                
    }
    filtrarPorCategoria(productos, "estampado");
});

btnRecomendados.addEventListener("click", () => { 
    
    divDistintosContainers.remove();
    carousel.remove();
    buscarProductosJson(" ");
    crearSeccionProductos(productos);
    renderProductosHTML(productos, true);
    
});

btnMasVendidos.addEventListener("click", () => { 
    
    divDistintosContainers.remove();
    carousel.remove();
    buscarProductosJson(" ");
    crearSeccionProductos(productos);
    renderProductosHTML(productos, true);
    
});

