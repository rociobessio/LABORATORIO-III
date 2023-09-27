/**
 * Esta funcion GENERA un SCOPE
 * y en lugar de dejar libres las funciones
 * en un scope global las dejo dentro de
 * un scope especifico.
 * Es como un NAMESPACE
 *
 * retorna un OBJETO que es son los punteros
 * a funciones.
 */ 
    export function sumar(a, b) {
      if (typeof a == "number" && typeof b == "number") return a + b;
      else return NaN; //-->Note of number
    }
  
    function restar(a, b) {
      return a - b;
    }
  
    /**
     * Multiplica 2 numeros.
     * @param {*} a
     * @param {*} b
     * @returns
     */
    export function multiplicar(a, b) {
      return a * b;
    }
  
    /**
     * Utilizando operador ternario
     * @param {*} a
     * @param {*} b
     * @returns pregunta si b no se puede
     * dividir retorna NaN y sino (:)
     * retorna la division.
     */
    export function dividir(a, b) {
      return validarCero(b) ? NaN : a / b;
    }
  
    /**
     * Valida si b === 0
     * es decir, si b es del mismo tipo
     * que 0.
     * @param {*} b
     * @returns
     */
    function validarCero(b) {
      return b === 0;
    }