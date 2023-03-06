
// CREAMOS NAV
const nav = document.getElementById("navBar");
const navBar = document.createElement("div");
navBar.classList.add("container-fluid");
navBar.innerHTML = `
    <a href="index.html"><img class="logoResto" src="img/logo2.png"></a>
        <button class="navbar-toggler" type="button"></button>
        <ul class="navbar-nav">
            <li class="nav-item">
          <button class="buttonNav" id = "botonVerCarrito">ver carrito
          </button>
          <button class="buttonNav" id = "botonVaciarCarrito">vaciar carrito
          </button>
        </li>
      </ul>
      `
nav.appendChild(navBar);

// ARRAYS
const arrayProductos = [hamburguesa1, hamburguesa2, hamburguesa3, hamburguesa4, hamburguesa5, hamburguesa6, hamburguesa7, hamburguesa8];

let carrito = [];

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
        <button class="btn btn-dark" id = "boton${producto.id}">Añadir al Carrito</button>
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
  if(enCarrito) {
      enCarrito.cantidad++;
  }else {
      const producto = arrayProductos.find(producto => producto.id === id);
      carrito.push(producto);
  }
  console.log(carrito);
}

// MOSTRAMOS Y ELIMINAMOS PRODUCTOS EN CARRITO 

const carritoMostrarDom = document.getElementById("mostrarCarrito");
const verCarrito = document.getElementById("botonVerCarrito"); /*Recordar boton creado en el NAV.*/


verCarrito.addEventListener("click", ( )=> {
vemosCarrito()
})


const vemosCarrito = () => {
  carritoMostrarDom.innerHTML = [];
  carrito.forEach(producto => {
     const cardBs = document.createElement("div");
      cardBs.classList.add("col-xl-3", "col-md-6");
      cardBs.innerHTML =     
        ` <div>CARRITO dsps mejorar</div>
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
    carrito.splice(indice,1);
    vemosCarrito();
// ACA TENGO QUE VER COMO AHCER PARA MODIFICAR LA CANTIDAD A ELIMINAR
} 

const vaciar = document.getElementById("botonVaciarCarrito");

vaciar.addEventListener("click", () => {
  eliminamosTodo()
});

const eliminamosTodo = () => {
  carrito = [];
  vemosCarrito();
}


const costoCompra = document.getElementById("costo");

const costo = () => {
  let total = carrito.reduce((acumulador, producto) => acumulador  + (producto.cantidad * producto.precio), 0);
  console.log(total);
  }

  costoCompra.innerHTML = `El Total es de $${total}`;

  





// CODIGO  BORRADOR NO USAR
// const vemosCarrito = () => {
      // contenedorMostrar.innerHTML = "";
      // carrito.forEach(producto => {
      // const cardBs = document.createElement("div");
      // cardBs.classList.add("col-xl-3", "col-md-6");
      // cardBs.innerHTML =
      //   `<div class="card cardProductos">
      //     <img src= ${producto.img} alt= ${producto.nombre}>
      //     <div class="card-body">
      //     <h2 class="card-title">${producto.nombre}</h2>
      //     <p> Cantidad: ${producto.cantidad} </p>
      //     <p class="card-text">$ ${producto.precio}</p></div>;
      //     <button class="btn btn-dark" id = "botonEliminar${producto.id}">eliminar del carrito</button>
      //     </div>`;
      
      // carritoMostrarDom.appendChild(cardBS)



// MOSTRAR PRODCUTOS AGREGADOS EN CARRITO - RECORDAR BOTON CREADO EN EL NAV
// const verCarrito = document.getElementById("botonVerCarrito");
// const contenedorMostrar = document.getElementById("contenedorMostrar");

// verCarrito.addEventListener("click", () => {
//   mostrarCarrito();
// })

// verCarrito.addEventListener("click", ( )=> {
//   console.log("funciona?");
// const mostrarCarrito = () => {
//   contenedorMostrar.innerHTML = "";
//     carrito.forEach(producto => {
//     const cardBs = document.createElement("div");
//     cardBs.classList.add("col-xl-3", "col-md-6");
//     cardBs.innerHTML =
//       `<div class="card cardProductos">
//         <img src= ${producto.img} alt= ${producto.nombre}>
//         <div class="card-body">
//         <h2 class="card-title">${producto.nombre}</h2>
//         <p> Cantidad: ${producto.cantidad} </p>
//         <p class="card-text">$ ${producto.precio}</p></div>;
//         <button class="btn btn-dark" id = "botonEliminar${producto.id}">eliminar del carrito</button>
//         </div>`;
    
//   contenedorMostrar.appendChild(cardBs); 
  
//   const boton = document.getElementById(`botoneliminar${producto.id}`);
//   boton.addEventListener("click", () => {
//       eliminarDelCarrito(producto.id);
//   })


//   })  

// CALCULAR EL TOTAL CARRITO  
// let total = carrito.reduce((acumulador, producto) => acumulador  + (producto.cantidad * producto.precio), 0);
// const compra = document.createElement("div");
// compra = document.className = "totalCompra";
// compra.innerHTML = `<p2 class="compra">Total a pagar: $${total}</p>`;
// contenedorMostrar.appendChild(compra);

// };


// const eliminarDelCarrito = (id) => {
//   const producto = carrito.find(producto => producto.id === id);
//   const indice = carrito.indexOf(producto);
//   carrito.splice(indice,1);
//   verProductos();

  //LocalStorage: 
//   localStorage.setItem("carrito", JSON.stringify(carrito));
// }


// VACIAR CARRITO
// const botonvaciar = document.getElementById("botonVaciar");




















// agregar = (id) => {
//         const agregarHamburg = carrito.find(producto => producto.id === id);
//         if (agregarHamburg) {
//           agregarHamburg.cantidad++
//         } else {
//           const producto = arrayProductos.find(producto => producto.id === id);
//           carrito.push(producto);
//         }
//       }


    // let agregar = document.createElement("button");
    // agregar.innerText = "Añadir al carrito";
    // agregar.classList = ("btn btn-dark");
    // compra.classList.add("btn btn-dark"); PENSAR PORQUE ASI NO FUNCIONA

    // cardBs.appendChild(agregar);

    // agregar.addEventListener("click", () => {
    //   carrito.push(producto)
    //   console.log(carrito);

    // })



    // FUNCION ENCONTRAR Y PUSH AL CARRITO
//     function agregar() {
//       const boton = document.getElementById(`boton${producto.id}`);
//       const agregarHamburg = carrito.find(producto => producto.id === boton);

//       if (agregarHamburg) {
//         agregarHamburg.cantidad++
//       } else {
//         agregarHamburg = 1;
//         arrayProductos.push(agregarHamburg)
//       }
    
//     // EVENTO 
//       boton.addEventListener("click", () => {
//       carrito.push(producto)
//       console.log(carrito);
//     })
//   };

// agregar.addEventListener("click", () => {
//   carrito.push(producto)
//   console.log(carrito);
// })

// BOTON NAV PARA MOSTRAR COMPRA
// const botonVerCarrito = document.getElementById("botonVerCarrito");

// botonVerCarrito.addEventListener("click", () => {
//   console.log("prueba");
//   botonVerCarrito.createElement("div");
//   botonVerCarrito.className("botonCarrito");
//   botonVerCarrito.innerHTML
// })