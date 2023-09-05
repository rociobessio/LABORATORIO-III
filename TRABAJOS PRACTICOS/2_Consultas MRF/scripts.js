console.log(data);

/*
    realizar las operaciones usando los metodos map,  reduce y filter y combinaciones entre ellos
  */


var soluciones = {};

// Retornar un array con los nombres de los usuarios femeninos
soluciones.usuariosFemeninos = function (usuarios) {
    return usuarios.filter(e => e.genero == "Female")
}
console.log("usuariosFemeninos",soluciones.usuariosFemeninos(data));

// Retornar un array de strings (el email de los usuarios de sexo masculino)
soluciones.mailsVarones = function (usuarios) {
    return usuarios.filter(e => e.genero == "Male").map(e=>e.email)
}
console.log("mailsVarones",soluciones.mailsVarones(data));

// Retornar un array de objetos que solo contengan las claves nombre, email y edad, de todos los usuarios mayores que 'edad'
soluciones.usuariosMayores = function (usuarios, edad) {
    return usuarios.filter(e => e.edad > 18).map(e=> { return {nombre:e.nombre, email:e.email, edad:e.edad} })
    // return usuarios.filter(e => e.edad > 18).map(u=> { let {nombre,email,edad} = u} )
}
console.log("usuariosMayores",soluciones.usuariosMayores(data, 40));

// Retornar un objeto que contenga solo el nombre y la edad del usuario mas grande.
soluciones.usuarioMasGrande = function (usuarios) {
    let max = Math.max(...usuarios.map((e)=> e.edad));
    return usuarios.filter((u)=> u.edad == max)
}
console.log("usuarioMasGrande",soluciones.usuarioMasGrande(data));

// Retornar el promedio de edad de los usuarios (number)
soluciones.promedio = function (usuarios) {
    return usuarios.reduce((a, user) => {return a + user.edad},0) / usuarios.length
}
console.log("Promedio edad usuarios " + soluciones.promedio(data));

// Retornar el promedio de edad de los usuarios hombres (number)
soluciones.promedioVarones = function (usuarios) {
    return usuarios.filter(e => e.genero == "Male").reduce((a, user) => {return a + user.edad},0) / usuarios.length
}
console.log("Promedio edad Varones " + soluciones.promedioVarones(data));

// Retornar el promedio de edad de los usuarios mujeres (number)
soluciones.promedioMujeres = function (usuarios) {
    return usuarios.filter(e => e.genero == "Female").reduce((a, user) => {return a + user.edad},0) / usuarios.length
}
console.log("Promedio edad Mujeres " + soluciones.promedioMujeres(data));