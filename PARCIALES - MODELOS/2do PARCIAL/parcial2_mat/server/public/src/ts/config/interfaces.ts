import { Anuncio_Mascota } from './datos-modelo';

export enum eType {
    text="text", 
    email="email", 
    number="number", 
    textarea="textarea", 
    checkbox="checkbox", 
    date="date", 
    radio="radio", 
    select="select"
}
export interface iFieldsModel {
        type: eType;
        nombre: string;
        placeholder: string;
        isRequired: boolean;
        isDisabled: boolean;
        isVisible: boolean;
        min?: number | string;
        max?: number | string;
        rows?: number;
        options?: iOptions[];
        maxlength?: number;
}
export interface iOptions {
    value: string;
    label: string;
}

// 

export enum eVacunas{
    si = "si",
    no = "no"
}

export enum eAnimal{
    gato = "gato",
    perro = "perro"
}

// 

export interface iResponse {
    data: any;
    message: string;
}