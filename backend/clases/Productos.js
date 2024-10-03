class Productos {
    constructor(data) {
        this.id = data.id;
        this.nombre = data.nombre;  
        this.precio = data.precio; 
        this.cantidad = data.cantidad; 
    }

    set id(id) {
        this._id = id;
    }

    set nombre(nombre) {
        const nombreRegex = /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ']{1,}([ ][A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}){0,}$/;
        if (nombreRegex.test(nombre)) {
            this._nombre = nombre;
        }       
    }

    set cantidad(cantidad = "") {
        this._cantidad = cantidad;
    }

    set precio(precio) {
        this._precio = precio;
    }

    get id() {
        return this._id;
    }

    get nombre() {
        return this._nombre;
    }

    get cantidad() {
        return this._cantidad;
    }

    get precio() {
        return this._precio;
    }

    getProducto() {
        const conId = {
            id: this._id,
            nombre: this._nombre,
            cantidad: this._cantidad,
            precio: this._precio,
        };
        const sinId = {
            nombre: this._nombre,
            cantidad: this._cantidad,
            precio: this._precio,
        };
        return this.id !== undefined ? conId : sinId;
    }
}

module.exports = Productos;

/* 
var data = {
    // id: "123",
    nombre: "Benito Juarez",
    precio: "150",
    cantidad: "50",
};

var producto1 = new Productos(data);
console.log(producto1.getProducto());
*/
