// Función de inicialización del documento
document.addEventListener('DOMContentLoaded', function() {
  const d = document;
  // Elementos del carrito
  const $listaCarrito = d.querySelector("#lista-carrito");
  const $totalCarrito = d.querySelector("#total-carrito");
  const $btnCompra = d.querySelector("#btn-compra");
  const $mensajeCompra = d.querySelector("#mensaje-compra");
  const $mensajeProcesando = d.querySelector("#mensaje-procesando");
  const $carrito = d.querySelector("#carrito");
  /**
  Maneja el evento de compra
  Muestra un loader durante 5 segundos y luego confirma la compra
   */
  $btnCompra.addEventListener("click", function (e) {
      if ($listaCarrito.children.length > 0) {
          // Mostrar el mensaje de espera y el loader
          $mensajeProcesando.classList.remove("hidden");
          $carrito.classList.add("hidden");
  
          // Simular la compra durante 5 segundos
          setTimeout(function () {
              // Ocultar el mensaje de espera y el loader
              $mensajeProcesando.classList.add("hidden");
              
              // Mostrar mensaje de compra exitosa
              $mensajeCompra.classList.remove("hidden");
  
              // Limpiar el carrito
              $listaCarrito.innerHTML = "";
              $totalCarrito.textContent = "0";
              
              // Ocultar mensaje de éxito después de 3 segundos
              setTimeout(function() {
                  $mensajeCompra.classList.add("hidden");
                  $carrito.classList.remove("hidden");
              }, 3000);
          }, 5000); // 5000 milisegundos = 5 segundos
      } else {
          alert("El carrito está vacío");
      }
  });
  
  /**
  Maneja los clics en los productos y botones del carrito
  Agrega productos al carrito
  Incrementa/decrementa cantidades
   */
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
                  <div class="controles-cantidad">
                      Cantidad: <span class="cantidad">1</span>
                      <button class="btn-mas">+</button>
                      <button class="btn-menos">-</button>
                  </div>
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
              // Incrementar la cantidad
              cantidad++;
          } else if (e.target.matches(".btn-menos")) {
              // Decrementar la cantidad (pero no menos de 0)
              if (cantidad > 1) {
                  cantidad--;
              } else {
                  // Si la cantidad es 1, eliminar el producto del carrito
                  $itemCarrito.remove();
              }
          }
  
          // Actualizar la cantidad en el carrito
          $cantidad.textContent = cantidad;
  
          // Actualizar el total del carrito
          actualizarTotalCarrito();
      }
  });
  
  /**
  Actualiza el total del carrito sumando todos los productos
  por su cantidad correspondiente
   */
  function actualizarTotalCarrito() {
      let total = 0;
      Array.from($listaCarrito.children).forEach(item => {
          const $precio = item.querySelector(".precio-producto");
          const $cantidad = item.querySelector(".cantidad");
          total += parseFloat($precio.textContent) * parseInt($cantidad.textContent);
      });
      $totalCarrito.textContent = total.toFixed(2);
  }
});