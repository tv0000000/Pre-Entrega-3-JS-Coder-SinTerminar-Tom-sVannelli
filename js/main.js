
// CREAMOS NAV
const nav = document.getElementById("navBar");
const navBar = document.createElement("div");
navBar.classList.add("container-fluid");
navBar.innerHTML = `
    <a href="index.html"><img class="logoResto" src="img/logo2.png"></a>
        <button class="navbar-toggler" type="button"></button>
        <ul class="navbar-nav">
            <li class="nav-item">
          <button class="buttonNav" id = "botonVerCarrito">Ver carrito
          </button>
          <button class="buttonNav" id = "botonVaciarCarrito">Vaciar carrito
          </button>
          <button class="buttonNav" id = "botonFinalizarCompra">Finalizar compra
          </button>
          <button class="buttonNav" id = "botonModo">Modo claro/oscuro
          </button>
        </li>
      </ul>
      `
nav.appendChild(navBar);

// ARRAYS
const arrayProductos = [hamburguesa1, hamburguesa2, hamburguesa3, hamburguesa4, hamburguesa5, hamburguesa6, hamburguesa7, hamburguesa8];

let carrito = [];

if (localStorage.getItem("carrito")) {
  carrito = JSON.parse(localStorage.getItem("carrito"))
}

// CONTENEDOR PARA PODER MOSTRAR PRODUCTOS 

const mostramosHamburguesas = document.getElementById("mostrarProductos");

const verProductos = () => {
  arrayProductos.forEach(producto => {
    const cardBs = document.createElement("div");
    cardBs.classList.add("col-xl-3", "col-md-6");
    cardBs.innerHTML =
      `<div class="card cardProductos">
        <img src= ${producto.img} alt= ${producto.nombre}>
        <div class="card-body">
        <h2 class="card-title">${producto.nombre}</h2>
        <p class="card-text">${producto.descripcion} </p>
        <p class="card-text">$ ${producto.precio} </p></div>
        <button class="btn btn-dark buttonCard" id = "boton${producto.id}">Añadir al Carrito</button>
        </div>`

    mostramosHamburguesas.appendChild(cardBs);

    const boton = document.getElementById(`boton${producto.id}`);
    boton.addEventListener("click", () => {
      agregar(producto.id);
    })
  })
};

verProductos();

// AGREGAR UN PRODUCTO AL CARRITO
const agregar = (id) => {
  const enCarrito = carrito.find(producto => producto.id === id);
  if (enCarrito) {
    enCarrito.cantidad++;
    costo();
  } else {
    const producto = arrayProductos.find(producto => producto.id === id);
    carrito.push(producto);
    costo();
  }
  console.log(carrito);
  localStorage.setItem("carrito", JSON.stringify(carrito))
}

// MOSTRAMOS Y ELIMINAMOS PRODUCTOS EN CARRITO 

const carritoMostrarDom = document.getElementById("mostrarCarrito");
const verCarrito = document.getElementById("botonVerCarrito"); /*Recordar boton creado en el NAV.*/


verCarrito.addEventListener("click", () => {
  vemosCarrito();
  costo();
})

// TITULO CARRITO
const titulo = document.getElementById("tituloCarrito");

const etiquetaTitulo = document.createElement("div");
etiquetaTitulo.innerHTML = `<div class="divTitulo"><p class="tituloCarrito">Carrito de Compras</p></div>`
titulo.appendChild(etiquetaTitulo);

const vemosCarrito = () => {
  carritoMostrarDom.innerHTML = [];
  carrito.forEach(producto => {
    const cardBs = document.createElement("div");
    cardBs.classList.add("col-xl-3", "col-md-6");
    cardBs.innerHTML =
      ` 
          <div class="card cardProductos">
          <img src= ${producto.img} alt= ${producto.nombre}>
          <div class="card-body">
          <h2 class="card-title">${producto.nombre}</h2>
          <p> Cantidad: ${producto.cantidad} </p>
          <p class="card-text">$ ${producto.precio}</p></div>;
          <button class="btn btn-dark" id ="botonEliminar${producto.id}">eliminar del carrito</button>
          </div>`;

    carritoMostrarDom.appendChild(cardBs)

    const botonEliminar = document.getElementById(`botonEliminar${producto.id}`);
    botonEliminar.addEventListener("click", () => {
      eliminamosProducto(producto.id);
    })
  })
}

const eliminamosProducto = (id) => {
  const productoEliminado = carrito.find(producto => producto.id === id);
  const indice = carrito.indexOf(productoEliminado);
  carrito.splice(indice, 1);
  vemosCarrito();
  costo()

  localStorage.setItem("carrito", JSON.stringify(carrito))

  // ACA TENGO QUE VER COMO HACER PARA MODIFICAR LA CANTIDAD A ELIMINAR
}

const vaciar = document.getElementById("botonVaciarCarrito");

vaciar.addEventListener("click", () => {
  eliminamosTodo()
});

const eliminamosTodo = () => {
  carrito = [];
  vemosCarrito();
  costo();

  localStorage.clear();
}

// COSTO TOTAL COMPRA 
const costoCompra = document.getElementById("costo");

const costo = () => {
  let total = carrito.reduce((acumulador, producto) => acumulador + (producto.cantidad * producto.precio), 0);
  console.log(total);
  costoCompra.innerHTML = `<p class="compra">Total de la compra: $${total}</p>`;
}

// FINALIZAR COMPRA
const finalizar = document.getElementById("botonFinalizarCompra"); /*Recordar boton creado en el NAV.*/
// const mostrarFinalizar = document.getElementById("mostrarFinalizar");

finalizar.addEventListener("click", () => {
  const formFinalizar = document.createElement("div");
  formFinalizar.innerHTML = `<form>
    <div class="mb-3 contenedorForm formFianlizar">
      <label for="exampleInputEmail1" class="labelForm">Ingrese su nombre</label>
      <input type="text" class="form-control textInput" id="exampleInputEmail1" aria-describedby="emailHelp">
      <label for="exampleInputEmail1" class="labelForm">Email</label>
      <input type="email" class="form-control textInput" id="exampleInputEmail1" aria-describedby="emailHelp">
      <label for="exampleInput" class="labelForm">Ingrese dirección para enviar pedido.</label>
      <input type="text" class="form-control textInput" id="exampleInputEmail1" aria-describedby="emailHelp">
      <p>El pago se realiza cuando el pedido se entrega</p>
      <button class="btn btn-warning" id="botonEnviar">Enviar</button>
    </div>`;
    carritoMostrarDom.appendChild(formFinalizar);
  costo()
  // VER COMO PUEDO ALMACENAR ESTO EN EL LOCAL STORAGE
});


//  BOTON ENVIAR NO FUNCIONA
const botonEnviar = document.getElementById("botonEnviar");/*Recordar boton creado en Finalizar Compra*/

botonEnviar.addEventListener("click", () => {
  const enviar = document.createElement("div");
  enviar.innerHTML = `<h3>Muchas gracias su pedido está en camino</h3>`
  carritoMostrarDom.appendChild(enviar);
});





// BOTON MODO /*Recordar boton creado en el NAV.*/
const botonModo = document.getElementById("botonModo");

botonModo.addEventListener("click", () => {
  document.body.classList.toggle("oscuro");
  if (document.body.classList.contains("oscuro")) {
    localStorage.setItem("botonModo", "oscuro");
  } else {
    localStorage.setItem("botonModo", "claro")
  }
})

const modoClaroOscuro = localStorage.getItem("botonModo")

if (modoClaroOscuro === "oscuro") {
  document.body.classList.add("oscuro")
} else {
  document.body.classList.remove("oscuro");
}













