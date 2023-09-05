namespace Personas{

    export class Cliente extends Persona {

        public edad:number;
        public sexo:TipoEnumPersona;

        constructor(id:number, nombre:string, apellido:string, edad:number, sexo:TipoEnumPersona) {
            super(id, nombre, apellido);
            this.edad = edad;
            this.sexo = sexo;
        }
    }
}