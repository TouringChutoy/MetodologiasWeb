# Tienda Online

## Listado de Entidades

### usuarios (ED)

- `usuario_id` (PK)
- `nombre`
- `email` (UQ)
- `contraseña` (hash)
- `dirección`
- `fecha_registro`

### categorias (ED)

- `categoria_id` (PK)
- `nombre`
- `descripción`

### productos (ED)

- `producto_id` (PK)
- `nombre`
- `descripción`
- `precio`
- `stock`
- `categoria_id` (FK)
- `imagen_url`

### carritos (ED|EP)

- `carrito_id` (PK)
- `usuario_id` (FK, UQ)
- `fecha_creación`
- `estado` (`activo`/`finalizado`)

### items_carrito (ED|EP)

- `item_id` (PK)
- `carrito_id` (FK)
- `producto_id` (FK)
- `cantidad`
- `precio_unitario`

### pedidos (ED)

- `pedido_id` (PK)
- `usuario_id` (FK)
- `carrito_id` (FK)
- `fecha`
- `total`
- `estado` (`pendiente`/`completado`/`cancelado`)
- `dirección_envio`

### detalles_pedido (ED|EP)

- `detalle_id` (PK)
- `pedido_id` (FK)
- `producto_id` (FK)
- `cantidad`
- `precio_unitario`

### pagos (ED)

- `pago_id` (PK)
- `pedido_id` (FK, UQ)
- `monto`
- `metodo_pago` (`tarjeta`/`transferencia`)
- `fecha`
- `estado` (`aprobado`/`rechazado`)

## Relaciones

1. **Usuario-Carrito**: 1:1  
   Un usuario tiene un solo carrito activo.

2. **Carrito-Items**: 1:M  
   Un carrito contiene múltiples items.

3. **Producto-Categoría**: M:1  
   Muchos productos pertenecen a una categoría.

4. **Usuario-Pedidos**: 1:M  
   Un usuario realiza múltiples pedidos.

5. **Carrito-Pedido**: 1:1 <!-- Nueva relación -->  
   Cada pedido se genera a partir de un carrito específico.

6. **Pedido-Detalles**: 1:M  
   Un pedido contiene múltiples detalles.

7. **Pedido-Pago**: 1:1  
   Cada pedido tiene un único pago asociado.

8. **Producto-Items**: 1:M  
   Un producto puede estar en muchos items de carrito.

## Diagramas

### **Modelo Racional de la BD Tienda Online**

![Diagrama Racional Tienda Online](./assets/Tienda%20Online%20Diagrama%20Racional%20Corregido.png)

## Reglas de Negocio

### usuarios

1. Registrar nuevo usuario (con validación de email único).
2. Actualizar datos de perfil.
3. Eliminar cuenta (en cascada: carrito, pedidos).

### productos

1. Actualizar stock al realizar un pedido.
2. Filtrar por categoría.

### carritos

1. Crear automáticamente al registrar usuario.
2. Convertir carrito en pedido al pagar (transacción).

### pagos

1. Validar monto contra total del pedido.
2. Actualizar estado del pedido a "completado" si pago es aprobado.
