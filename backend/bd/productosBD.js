const productosBD = require("./conexion").productos; // Cambiado de usuarios a productos
const Productos = require("../clases/Productos");

function validarProductos(producto) {
    var datosCorrectos = false;
    if (producto.nombre != undefined && producto.cantidad != undefined && producto.precio != undefined) { 
        datosCorrectos = true;
    }
    return datosCorrectos;
}

async function mostrarProductos() {
    const productos = await productosBD.get();
    var productosValidos = [];

    productos.forEach(producto => {
        const producto1 = new Productos({ id: producto.id, ...producto.data() });
        const producto2 = producto1.getProducto();
        if (validarProductos(producto2)) { 
            productosValidos.push(producto2); 
        }
    });

    return productosValidos;
}

async function buscarPorId(id) {
    const producto = await productosBD.doc(id).get();
    const producto1 = new Productos({ id: producto.id, ...producto.data() });
    var productoValido = { error: true };

    if (validarProductos(producto1.getProducto())) {
        productoValido = producto1.getProducto();
    }
    return productoValido;
}

async function nuevoProducto(data) {
    const producto1 = new Productos(data);

    var productoValido = false;
    if (validarProductos(producto1.getProducto())) {
        await productosBD.doc().set(producto1.getProducto());
        productoValido = true;
    }

    return productoValido;
}

async function borrarProducto(id) {
    const productoB = await buscarPorId(id);
    var borrado = false;

    if (productoB.error != true) {
        await productosBD.doc(id).delete();
        borrado = true;
    }

    return borrado;
}

module.exports = {
    mostrarProductos,
    nuevoProducto,
    borrarProducto,
    buscarPorId
};
