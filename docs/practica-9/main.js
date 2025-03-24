const d = document;
const $listaCarrito = d.querySelector("#lista-carrito");
const $totalCarrito = d.querySelector("#total-carrito");
const $btnCompra = d.querySelector("#btn-compra");
const $mensajeCompra = d.querySelector("#mensaje-compra");

// Función para obtener datos de GitHub
async function obtenerDatosDeGitHub() {
  let apiURL = "https://api.github.com/users/TouringChutoy";
  let response = await fetch(apiURL);
  let data = await response.json();
  console.log(response, data);

  const $sectionGitHub = d.querySelector("#github");

  let content = `
    <h4>${data.name}</h4>
    <h5>${data.location}</h5>
    <p>${data.bio}</p>
    <img alt="${data.name}" src="${data.avatar_url}">
  `;

  $sectionGitHub.innerHTML = content;
}

// Función para obtener datos de productos
async function obtenerDatosProductos() {
  let apiURL = "./data.json";
  let response = await fetch(apiURL);
  let data = await response.json();
  console.log(response, data);

  const $sectionProducts = d.querySelector("#products");

  let content = "";

  data.productos.forEach(function (el) {
    content += `
      <article class="producto" data-nombre="${el.title}" data-precio="${el.price}">
        <h4>${el.title}</h4>
        <h5>$${el.price}</h5>
        <h5>${el.category}</h5>
        <img alt="${el.title}" src="${el.image}" />
        <h6>Rating: ${el.rating.rate} (${el.rating.count} reviews)</h6>
      </article>
    `;
  });

  $sectionProducts.innerHTML = content;
}

// Función para actualizar el total del carrito
function actualizarTotalCarrito() {
  let total = 0;
  Array.from($listaCarrito.children).forEach(item => {
    const $precio = item.querySelector(".precio-producto");
    const $cantidad = item.querySelector(".cantidad");
    total += parseFloat($precio.textContent) * parseInt($cantidad.textContent);
  });
  $totalCarrito.textContent = total.toFixed(2);
}

// Evento para el botón de compra
$btnCompra.addEventListener("click", function (e) {
  if ($listaCarrito.children.length > 0) {
    $mensajeCompra.classList.remove("hidden");

    setTimeout(function () {
      $mensajeCompra.classList.add("hidden");
      $listaCarrito.innerHTML = "";
      $totalCarrito.textContent = "0";
      alert("Compra realizada con éxito");
    }, 5000);
  } else {
    alert("El carrito está vacío");
  }
});

// Evento para agregar productos al carrito
d.addEventListener("click", function (e) {
  // Agregar producto al carrito
  if (e.target.matches(".producto")) {
    const $producto = e.target;
    let nombre = $producto.getAttribute("data-nombre");
    let precio = parseFloat($producto.getAttribute("data-precio"));

    // Verificar si el producto ya está en el carrito
    let $itemExistente = Array.from($listaCarrito.children).find(item => {
      return item.querySelector(".nombre-producto").textContent === nombre;
    });

    if ($itemExistente) {
      // Si el producto ya está en el carrito, incrementar la cantidad
      let $cantidad = $itemExistente.querySelector(".cantidad");
      let cantidad = parseInt($cantidad.textContent);
      $cantidad.textContent = cantidad + 1;
    } else {
      // Si el producto no está en el carrito, agregarlo
      const $itemCarrito = d.createElement("li");
      $itemCarrito.innerHTML = `
        <span class="nombre-producto">${nombre}</span> - $<span class="precio-producto">${precio.toFixed(2)}</span>
        <span class="cantidad">1</span>
        <button class="btn-mas">+</button>
        <button class="btn-menos">-</button>
      `;
      $listaCarrito.appendChild($itemCarrito);
    }

    // Actualizar el total del carrito
    actualizarTotalCarrito();
  }

  // Manejar clics en los botones de "+" y "-"
  if (e.target.matches(".btn-mas") || e.target.matches(".btn-menos")) {
    const $itemCarrito = e.target.closest("li");
    const $cantidad = $itemCarrito.querySelector(".cantidad");
    const $precio = $itemCarrito.querySelector(".precio-producto");
    let cantidad = parseInt($cantidad.textContent);
    let precio = parseFloat($precio.textContent);

    if (e.target.matches(".btn-mas")) {
      cantidad++;
    } else if (e.target.matches(".btn-menos")) {
      if (cantidad > 1) {
        cantidad--;
      } else {
        $itemCarrito.remove();
      }
    }

    $cantidad.textContent = cantidad;
    actualizarTotalCarrito();
  }
});

// Cargar datos al cargar la página
d.addEventListener("DOMContentLoaded", function (e) {
  obtenerDatosDeGitHub();
  obtenerDatosProductos();
});