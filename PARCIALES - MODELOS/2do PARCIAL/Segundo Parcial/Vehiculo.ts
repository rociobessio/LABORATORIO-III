namespace Cars {

    export class Vehiculo {

        public id: number;
        public marca: string;
        public modelo: string;
        public precio: number;


        constructor(marca: string, modelo: string, precio: number, id: number) {

            this.id = id;
            this.marca = marca;
            this.modelo = modelo;
            this.precio = precio;

        }


    }

}