# Tienda Online

## Listado de Entidades

### usuarios **(ED)**
- usuario_id **(PK)**
- nombre
- apellidos
- email **(UQ)**
- contraseña (hash)
- dirección
- teléfono
- fecha_registro

### productos **(ED)**
- producto_id **(PK)**
- nombre
- descripción
- precio
- stock
- categoria_id **(FK)**
- imagen_url

### categorias **(ED)**
- categoria_id **(PK)**
- nombre
- descripción

### carritos **(ED|EP)**
- carrito_id **(PK)**
- usuario_id **(FK)**
- fecha_creación
- estado (activo/finalizado)

### items_carrito **(ED|EP)**
- item_id **(PK)**
- carrito_id **(FK)**
- producto_id **(FK)**
- cantidad
- precio_unitario

### pedidos **(ED)**
- pedido_id **(PK)**
- usuario_id **(FK)**
- fecha
- total
- estado (pendiente/completado/cancelado)
- dirección_envio

### detalles_pedido **(ED|EP)**
- detalle_id **(PK)**
- pedido_id **(FK)**
- producto_id **(FK)**
- cantidad
- precio_unitario

### pagos **(ED)**
- pago_id **(PK)**
- pedido_id **(FK)**
- monto
- metodo_pago (tarjeta/transferencia)
- fecha
- estado (aprobado/rechazado)

## Relaciones

1. Un **usuario** tiene un **carrito** activo (_1 - 1_).
2. Un **carrito** contiene **items_carrito** (_1 - M_).
3. Un **producto** pertenece a una **categoría** (_M - 1_).
4. Un **usuario** realiza **pedidos** (_1 - M_).
5. Un **pedido** contiene **detalles_pedido** (_1 - M_).
6. Un **pedido** tiene un **pago** (_1 - 1_).
7. Un **producto** puede estar en muchos **items_carrito** (_1 - M_).

## Diagramas

### **Modelo Racional de la BD Tienda Online**

![Diagrama Racional Tienda Online](./assets/Tienda%20Online%20Diagrama%20Racional.png)

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
