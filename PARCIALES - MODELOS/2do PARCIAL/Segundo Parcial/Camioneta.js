"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Cars;
(function (Cars) {
    var Camioneta = /** @class */ (function (_super) {
        __extends(Camioneta, _super);
        function Camioneta(marca, modelo, precio, cuatroXcuatro, id) {
            var _this = _super.call(this, marca, modelo, precio, id) || this;
            _this.cuatroXcuatro = cuatroXcuatro;
            return _this;
        }
        return Camioneta;
    }(Cars.Vehiculo));
    Cars.Camioneta = Camioneta;
})(Cars || (Cars = {}));
