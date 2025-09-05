let btnProyects = document.getElementById("proyects");
let btnSkills = document.getElementById("skills");
let skillsContainer = document.getElementById("skillsContainer");
let proyectsContainer = document.getElementById("proyectsContainer");

btnProyects.addEventListener("click", () => {
    if(btnProyects.className != "selector"){
        proyectsContainer.innerHTML = `<div class="card">
                    <img src="proyects/tienda/imagenes/Inicio.png" alt="Inicio Tienda">
                    <div class="card-content">
                        <h3>Tienda de ventas</h3>
                        <p>Maqueta de tienda de ventas, con carrito interactivo y disitnos metodos de filtrado y busqueda de los productos.</p>
                        <a href="proyects/tienda/tienda.html" class="btn">Ver mas.</a>
                    </div>
                </div>   
                <div class="card">
                    <img src="proyects/AlumnosApi/imagenes/InicioAlumnos.png" alt="">
                    <div class="card-content">
                        <h3>Manejo de Api con Javascript</h3>
                        <p>Calculador de promedio de alumnos, permitiendonos cargarlos y eliminarlos manualmente y cargarlos a traves de una Api.</p>
                        <a href="proyects/AlumnosApi/index1.html" class="btn">Ver mas</a>
                    </div>
                
                </div>`
    }

    btnProyects.className = "selector";
    btnSkills.className = "selectorSelected";
    skillsContainer.innerHTML = "";
    //Espacio para cargar los proyeectos/card
});
btnSkills.addEventListener("click", () => {
    btnSkills.className = "selector";
    btnProyects.className = "selectorSelected";
    proyectsContainer.innerHTML = "";
    skillsContainer.innerHTML = ` <h3>Habilidades </h3>   
            <div class="skills">
                <div class="skills-column">
                    <div class="column-icons">
                        <i class="fa-regular fa-square-check"></i>
                        
                        <i class="fa-regular fa-square-check"></i>
                        <i class="fa-regular fa-square-check"></i>
                        
                    </div>
                    <div class="skill-name">
                        <div class="skill-item">
                            <i class="fa-brands fa-html5"></i>
                            <span>HTML</span>
                        </div>
                        <div class="skill-item">
                            <i class="fa-brands fa-python"></i>
                            <span>Python</span>
                        </div>
                        <div class="skill-item">
                            <i class="fa-brands fa-square-js"></i>
                            <span>Js</span>
                        </div>
                    </div>
                </div>
                <div class="skills-column">
                    <div class="column-icons">
                        <i class="fa-regular fa-square-check"></i>
                        <i class="fa-regular fa-square-check"></i>
                    </div>
                    <div class="skill-name">
                        <div class="skill-item">
                            
                            
                            <i class="fa-brands fa-css3-alt"></i>
                            <span>CSS</span>
                        </div>
                        <div class="skill-item">
                            <i class="fa-solid fa-c"></i>
                            
                        </div>
                    </div>

                </div>`;
    
});