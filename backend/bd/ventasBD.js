const ventasBD = require("./conexion").ventas; 
const Ventas = require("../clases/Ventas"); 


const validarDatosVenta = (venta) => {
    let datosCorrectos = false;
    if (venta.idUsuario !== undefined && venta.idProducto !== undefined && venta.cantidad !== undefined) {
        datosCorrectos = true;
    }
    return datosCorrectos;
};


async function mostrarVentas() {
    const ventasSnapshot = await ventasBD.get();
    let ventasValidas = [];

    ventasSnapshot.forEach(doc => {
        const venta = new Ventas({ id: doc.id, ...doc.data() });
        const datosVenta = venta.getVenta;

        if (validarDatosVenta(datosVenta)) { 
            ventasValidas.push(datosVenta); 
        }
    });

    return ventasValidas; 
}


async function buscarVentaPorId(id) {
    const ventaDoc = await ventasBD.doc(id).get();
    const venta = new Ventas({ id: ventaDoc.id, ...ventaDoc.data() });
    let ventaValida = { error: true };

    if (validarDatosVenta(venta.getVenta)) {
        ventaValida = venta.getVenta;
    }

    return ventaValida; 
}


async function nuevaVenta(data) {
    const venta = new Ventas(data);
    let ventaValida = false;

    if (validarDatosVenta(venta.getVenta)) {
        await ventasBD.doc().set(venta.getVenta); 
        ventaValida = true; 
    }

    return ventaValida;
}


async function actualizarStatus(id, nuevoStatus) {
    const venta = await buscarVentaPorId(id); 
    let actualizado = false;

  
    await ventasBD.doc(id).update({ status: nuevoStatus }); 
    actualizado = true; 

    return actualizado; 
}


async function borrarVenta(id) {
    const venta = await buscarVentaPorId(id); 
    let borrado = false;

    if (!venta.error) { 
        await ventasBD.doc(id).delete(); 
        borrado = true; 
    }

    return borrado; 
}


module.exports = {
    mostrarVentas,
    nuevaVenta,
    buscarVentaPorId,
    actualizarStatus, 
    borrarVenta
};
