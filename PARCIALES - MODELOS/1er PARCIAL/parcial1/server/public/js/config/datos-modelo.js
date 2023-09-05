export class Anuncio {
    constructor(id, titulo, transaccion = "ventas", descripcion, precio, ) {
        this.id = id;
        this.titulo = titulo;
        this.transaccion = transaccion;
        this.descripcion = descripcion;
        this.precio = precio;
    }
    id
    titulo
    transaccion //(por defecto todas van a ser ventas)
    descripcion
    precio
}
export class Anuncio_Mascota extends Anuncio {
    constructor(id, titulo, transaccion, descripcion, precio, animal, raza, fecha_de_nacimiento, vacunas) {
        super(id, titulo, transaccion, descripcion, precio);
        this.animal = animal;
        this.raza = raza;
        this.fecha_de_nacimiento = fecha_de_nacimiento;
        this.vacunas = vacunas;
    }
    animal;
    raza;
    fecha_de_nacimiento;
    vacunas;
}
