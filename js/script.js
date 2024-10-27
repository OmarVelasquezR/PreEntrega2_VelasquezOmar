// Array de productos disponible
const productos = [
    // Suplementos
    { id: 1, nombre: 'Proteína en polvo', precio: 50000, categoria: 'suplemento' },
    { id: 2, nombre: 'Creatina', precio: 40000, categoria: 'suplemento' },
    { id: 3, nombre: 'Aminoácidos', precio: 30000, categoria: 'suplemento' },
    { id: 4, nombre: 'Pre-entrenamiento', precio: 45000, categoria: 'suplemento' },
    { id: 5, nombre: 'Proteína vegana', precio: 55000, categoria: 'suplemento' },
    
    // Snacks
    { id: 6, nombre: 'Barra energética', precio: 15000, categoria: 'snack' },
    { id: 7, nombre: 'Barras de granola', precio: 20000, categoria: 'snack' },
    { id: 8, nombre: 'Barra de proteína', precio: 17000, categoria: 'snack' },
    { id: 9, nombre: 'Galletas de avena', precio: 12000, categoria: 'snack' },
    { id: 10, nombre: 'Proteína de almendra', precio: 18000, categoria: 'snack' },
    
    // Bebidas
    { id: 11, nombre: 'Bebida isotónica', precio: 10000, categoria: 'bebida' },
    { id: 12, nombre: 'Batido de proteínas', precio: 30000, categoria: 'bebida' },
    { id: 13, nombre: 'Energizante natural', precio: 20000, categoria: 'bebida' },
    { id: 14, nombre: 'Electrolitos', precio: 18000, categoria: 'bebida' },
    { id: 15, nombre: 'Smoothie de frutas', precio: 15000, categoria: 'bebida' },
];

// Array para el carrito de compras
let carrito = [];

// Función para solicitar el nombre del usuario (asegurando que no esté vacío)
function solicitarNombre() {
    let nombre = "";
    while (!nombre) {
        nombre = prompt("💪Bienvenido a nuestra tienda de suplementos fitness.💪 \n\nPor favor, ingresa tu nombre para comenzar.");
    }
    return nombre;
}

// Función para mostrar productos por categoría y el resumen del carrito
function mostrarProductosPorCategoria(categoria, nombreUsuario) {
    let mensaje = `\n🛒 Productos en la categoría: '${categoria.toUpperCase()}'\n\n`;
    mensaje += "✅ Para agregar o quitar un producto del carrito, ingresa el ID correspondiente.\n\n";
    productos
        .filter(prod => prod.categoria === categoria)
        .forEach(producto => {
            mensaje += `ID: ${producto.id} - ${producto.nombre} - $${producto.precio.toLocaleString('es-CO')}\n`;
        });

    mensaje += "\n---------------------------------------------------------------\n";
    mensaje += `Resumen del carrito actual para ${nombreUsuario}:\n\n${resumenCarrito()}`;
    return mensaje;
}

// Función para generar un resumen de los productos en el carrito
function resumenCarrito() {
    if (carrito.length === 0) return "🛒 Carrito vacío\n";
    let resumen = "";
    carrito.forEach(item => {
        resumen += `${item.cantidad} x ${item.nombre} - $${(item.precio * item.cantidad).toLocaleString('es-CO')}\n`;
    });
    const total = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
    const totalConDescuento = calcularTotalConDescuento();
    resumen += `\n💵 Total: $${total.toLocaleString('es-CO')}\n`;
    resumen += `💸 Total con descuento aplicado (si corresponde): $${totalConDescuento.toLocaleString('es-CO')}`;
    return resumen;
}

// Función para agregar o quitar productos del carrito
function modificarCarrito(idProducto, cantidad, nombreUsuario, categoria) {
    const producto = productos.find(prod => prod.id === Math.abs(idProducto));

    // Comprobar si el producto pertenece a la categoría seleccionada
    if (producto && producto.categoria === categoria) {
        const itemCarrito = carrito.find(item => item.id === producto.id);
        
        // Si el producto ya está en el carrito
        if (itemCarrito) {
            itemCarrito.cantidad += cantidad;

            // Remover del carrito si la cantidad es menor o igual a 0
            if (itemCarrito.cantidad <= 0) {
                carrito = carrito.filter(item => item.id !== producto.id);
                alert(`🟡 ${producto.nombre} ha sido eliminado del carrito.`);
            } else {
                alert(`🔄 Se ha actualizado la cantidad de ${producto.nombre} a ${itemCarrito.cantidad} en tu carrito, ${nombreUsuario}.`);
            }
        } 
        // Si el producto no está en el carrito y se desea agregar una cantidad positiva
        else if (cantidad > 0) {
            carrito.push({ ...producto, cantidad });
            alert(`🟢 ${cantidad} x ${producto.nombre} ha(n) sido agregado(s) a tu carrito, ${nombreUsuario}.`);
        } else {
            alert("⚠️ No se puede eliminar una cantidad de un producto que no está en el carrito.");
        }
    } else if (producto) {
        alert(`⚠️ El producto '${producto.nombre}' no se encuentra en la categoría '${categoria.toUpperCase()}'.`);
    } else {
        alert("⚠️ Producto no encontrado. Verifica el ID e inténtalo nuevamente.");
    }
}

// Función para calcular el total con descuento
function calcularTotalConDescuento() {
    const total = carrito.reduce((suma, prod) => suma + prod.precio * prod.cantidad, 0);
    const descuento = total > 100000 ? 0.1 * total : 0; // 10% de descuento si el total supera 100,000
    return total - descuento;
}

// Función para mostrar el total de la compra
function mostrarTotal(nombreUsuario) {
    const totalConDescuento = calcularTotalConDescuento();
    let detallesCompra = "";

    carrito.forEach(item => {
        detallesCompra += `${item.cantidad} x ${item.nombre} - $${(item.precio * item.cantidad).toLocaleString('es-CO')}\n`;
    });

    alert(`🧾 Resumen de compra, ${nombreUsuario}:\n\n${detallesCompra}\n💵 Total con descuento aplicado (si corresponde): $${totalConDescuento.toLocaleString('es-CO')}`);
}

// Función para vaciar el carrito con verificación
function vaciarCarrito() {
    const confirmacion = prompt("¿Estás seguro de que deseas vaciar tu carrito y reiniciar la compra? \n\nIngresa 'si' para confirmar o cualquier otra tecla para cancelar.");
    if (confirmacion && confirmacion.toLowerCase() === 'si') {
        carrito = [];
        alert("🛒 Tu carrito ha sido vaciado exitosamente.");
    } else {
        alert("✅ El carrito no ha sido vaciado. Puedes continuar con tu compra.");
    }
}

// Función principal del simulador, con bienvenida personalizada y control de nombre
function iniciarSimulador() {
    const nombreUsuario = solicitarNombre();

    alert(`👋¡Hola, ${nombreUsuario}! \n\nEstamos listos para ayudarte a seleccionar los mejores productos para tu entrenamiento. \n\nPodrás elegir entre varias categorías y armar tu carrito de compras. \n\n⚠️ Recuerda que si tu total supera $100,000, obtendrás un descuento del 10% en tu compra.`);

    let categoria;
    let opcion;

    do {
        // Ventana con solo 4 opciones
        opcion = prompt(`Por favor selecciona una opción, ${nombreUsuario}:\n\n1. Agregar o quitar productos\n2. Ver resumen del carrito\n3. Vaciar carrito\n0. Finalizar compra`);

        if (opcion === "1") {
            // Ventana para seleccionar categoría
            categoria = prompt(`Selecciona una categoría de productos:\n\n1. Suplementos\n2. Snacks\n3. Bebidas\n0. Volver`);
            
            if (categoria === "1") {
                categoria = "suplemento";
            } else if (categoria === "2") {
                categoria = "snack";
            } else if (categoria === "3") {
                categoria = "bebida";
            } else if (categoria === "0") {
                alert("✅ Regresando al menú principal.");
                continue;
            } else {
                alert("⚠️ Opción no válida. Por favor selecciona una categoría correcta.");
                continue;
            }

            // Mostrar productos en la categoría seleccionada
            const productosCategoria = mostrarProductosPorCategoria(categoria, nombreUsuario);
            const idProducto = parseInt(prompt(productosCategoria));
            const cantidad = parseInt(prompt("Por favor, ingresa la cantidad que deseas agregar (o un número negativo para restar o quitar productos. Ejemplo: -3):"));
            modificarCarrito(idProducto, cantidad, nombreUsuario, categoria);
        } else if (opcion === "2") {
            alert(`📋 Resumen del carrito actual para ${nombreUsuario}:\n\n⚠️ Recuerda que si tu total supera $100,000, obtendrás un descuento del 10% en tu compra.\n\n${resumenCarrito()}`);
        } else if (opcion === "3") {
            vaciarCarrito();
        } else if (opcion === "0") {
            // Confirmar finalización de compra y mostrar resumen
            const resumenCompra = resumenCarrito();
            const confirmarFinalizar = prompt(`¿Estás seguro que deseas finalizar la compra, ${nombreUsuario}? \n\nResumen de compra:\n\n${resumenCompra}\n\nIngresa 'si' para confirmar o cualquier otra tecla para continuar comprando.`);
            if (confirmarFinalizar && confirmarFinalizar.toLowerCase() === 'si') {
                break; // Salir del bucle para finalizar la compra
            } else {
                alert("✅ Puedes seguir comprando.");
            }
        } else {
            alert("⚠️ Opción no válida. Por favor selecciona una opción correcta.");
        }
    } while (true);

    mostrarTotal(nombreUsuario);
    alert(`✅ Gracias por tu compra, ${nombreUsuario}! \n\n¡Te esperamos de nuevo!`);
}

// Iniciar el simulador
iniciarSimulador();
