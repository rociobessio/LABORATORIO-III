import { eAnimal, eVacunas } from './interfaces.js';

export class Anuncio {
    constructor(id: number | string, titulo: string, transaccion: string = "ventas", descripcion: string, precio: number,) {
        this.id = (typeof id == "string")?parseInt(id):id;
        this.titulo = titulo;
        this.transaccion = transaccion;
        this.descripcion = descripcion;
        this.precio = precio;
    }
    id: number
    titulo: string
    transaccion: string //(por defecto todas van a ser ventas)
    descripcion: string
    precio: number
}
export class Anuncio_Mascota extends Anuncio {
    constructor(id: number, titulo: string, transaccion: string, descripcion: string, precio: number, animal: eAnimal, raza: string, fecha_de_nacimiento: Date, vacunas: eVacunas) {
        super(id, titulo, transaccion, descripcion, precio);
        this.animal = animal;
        this.raza = raza;
        this.fecha_de_nacimiento = fecha_de_nacimiento;
        this.vacunas = vacunas;
    }
    animal: eAnimal;
    raza: string;
    fecha_de_nacimiento: Date;
    vacunas: eVacunas;
}

