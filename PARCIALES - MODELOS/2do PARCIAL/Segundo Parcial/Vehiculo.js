"use strict";
var Cars;
(function (Cars) {
    var Vehiculo = /** @class */ (function () {
        function Vehiculo(marca, modelo, precio, id) {
            this.id = id;
            this.marca = marca;
            this.modelo = modelo;
            this.precio = precio;
        }
        return Vehiculo;
    }());
    Cars.Vehiculo = Vehiculo;
})(Cars || (Cars = {}));
