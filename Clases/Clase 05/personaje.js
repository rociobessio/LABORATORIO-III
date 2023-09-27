const personaje = {
    rol: "arquero",
    nivel: "maestro",
    id: 123,
};

//-->Esto es lo mismo, se asigna solo
//Es la desestruraccion d objetos.
let {rol,nivel,id} = personaje;

//-->Que esto
// rol = personaje.rol;
// nivel = personaje.nivel;
// id = personaje["id"];

console.log(rol,nivel,id);