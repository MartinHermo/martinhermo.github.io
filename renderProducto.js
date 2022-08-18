function creaorSeccionProductos(array){



    const divDisplayProductos = document.createElement("div");
    divDisplayProductos.className = "container-fluid displayProductos";
    const section = document.createElement("section");

    divDisplayProductos.innerHTML = `
    <div class="row d-flex">
        <div class="categorias" id="categorias">
            <div class="categoriasPlegadas">
                <span class="btn-cat" id="btn-cat"><i class="fa-solid fa-angles-left"></i></span>
                    <select class="selector" >
                        <option selected>Ordenar</option>
                        <option value="1">Menor Precio</option>
                        <option value="2">Mayor precio</option>
                        <option value="3">Mas Vendido</option>
                    </select>
                <ul class="cat">
                    <h5 class="cat-titule">Categorias</h5>
                    <li> <a href="Productos.html">Esmalatado</a> </li>
                    <li><a href="#">Secado</a> </li>
                    <li><a href="#">Limado</a> </li>
                    <li><a href="#">Estampado</a> </li>
                    <li><a href="#">Liquidos</a> </li>
                    <li><a href="#">Construcion</a> </li>
                    <li><a href="#">Decorado</a> </li>
                    <li><a href="#">Polvos</a> </li>
                </ul>
            </div>
        </div>
    </div> `;

    section.append(divDisplayProductos);


    const  divProductosScreen = document.createElement("div");
    divProductosScreen.className = "productosScreen";
    const divShowProduct = document.createElement("div");
    divShowProduct.className = "showProducts row";
    divProductosScreen.append(divShowProduct);
    divDisplayProductos.append(divProductosScreen);

    const renderProductosHTML = (array) => ({
        arrayforEach(producto => {
            /*<div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                <div class="card" style="width: 100%;">
                    <img src="meline.jpg"  class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">Meline Rosa 311</h5>
                      <p class="card-text">Esmalate semipermante de secado por cabina uv.</p>
                      <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                  </div>
            </div>*/

            const divCardContainer = document.createElement("div");
            divCardContainer.className = "col-xl-4 col-lg-6 col-md-6 col-sm-12";

            const divCard = document.createElement("div");
            divCard.style = "width: 100%;";
            divCard.className ="card";

            divCard.innerHTML = `
            <img src="${producto.img}"  class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title"> ${producto.name} </h5>
            <p class="card-text"> ${producto.descripcion} </p>
              <a href="#" class="btn btn-primary">Añadir al Carrito.</a>
            </div>`

        });

    });

    const async productosApi = () => ({
        const resp = await fetch("productos.json");
        const data = await resp.json();
        console.log(data);
    });

}