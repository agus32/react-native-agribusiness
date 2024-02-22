export const Personas = [
    {
      "rol": 1,      
      "cedula": "204349197",      
      "correo": "lautarotetamusa@gmail.com",      
      "nombre": "Lautaro",      
      "cod_zona": 1,      
      "id_depto": 1,      
      "telefono": null,      
      "direccion": "urquiza 1159"      
    },
  
    {     
      "rol": 0,      
      "cedula": "2043491978",      
      "correo": "lautarotetamusa@gmail.com",      
      "nombre": "Lautaro",      
      "cod_zona": 1,      
      "id_depto": 1,      
      "telefono": null,      
      "direccion": "urquiza 1159"      
    },
  
    {      
      "rol": 1,     
      "cedula": "39214282",     
      "correo": "juanramon@gmail.com",      
      "nombre": "Juan ramon",      
      "cod_zona": 2,     
      "id_depto": 2,      
      "telefono": null,      
      "direccion": "zeballos 1159"      
    },
  
    {      
      "rol": 0,      
      "cedula": "43491978",      
      "correo": "lautarotetamusa@gmail.com",      
      "nombre": "Lautaro",      
      "cod_zona": 1,      
      "id_depto": 1,      
      "telefono": null,      
      "direccion": "urquiza 1159"      
    },
  
    {      
      "rol": 1,      
      "cedula": "43491979",      
      "correo": "lautarotetamusa@gmail.com",      
      "nombre": "Lautaro",      
      "cod_zona": 1,      
      "id_depto": 1,      
      "telefono": null,      
      "direccion": "urquiza 1159"      
    }
];

export const fechaParser = (fecha) => {
  const date = new Date(fecha);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export const noImg = "https://www.steaua-dunarii.ro/client/img/image-not-found.png";


export const Proveedores = [
  {
    id: 1,
    nombre: "Juan Perez"
  },
  {
    id: 2,
    nombre: "Maria Martinez"
  },
  {
    id: 3,
    nombre: "Mauro Gonzalez"
  },
  {
    id: 4,
    nombre: "Soledad Rodriguez"
  }
];


export const Productos = [
  {
      id_producto: 1,
      precio: "10.02",
      nombre: "Producto 1",
      presentacion: "Presentación 1",
      descripcion: "Descripción 1",
      ficha_tecnica: "../fichas_tecnicas/ejemplo.pdf",
      imagen: "https://naturespath.com/cdn/shop/articles/planting-seeds.jpg?v=1639148471",
      nombre_proveedor: "Maria Martinez"
    },
    {
      id_producto: 2,
      precio: "15.3",
      nombre: "Producto 2",
      presentacion: "Presentación 2",
      descripcion: "Descripción 2",
      ficha_tecnica: "../fichas_tecnicas/ejemplo.pdf",
      imagen: "https://naturespath.com/cdn/shop/articles/planting-seeds.jpg?v=1639148471",
      nombre_proveedor: "Juan Perez"
    },
    {
      id_producto: 3,
      precio: "25",
      nombre: "Producto 3",
      presentacion: "Presentación 3",
      descripcion: "Descripción 3",
      ficha_tecnica: "../fichas_tecnicas/ejemplo.pdf",
      imagen: "https://naturespath.com/cdn/shop/articles/planting-seeds.jpg?v=1639148471",
      nombre_proveedor: "Mauro Gonzalez"
    },
    {
      id_producto: 4,
      precio: "8",
      nombre: "Producto 4",
      presentacion: "Presentación 4",
      descripcion: "Descripción 4",
      ficha_tecnica: "../fichas_tecnicas/ejemplo.pdf",
      imagen: "https://naturespath.com/cdn/shop/articles/planting-seeds.jpg?v=1639148471",
      nombre_proveedor: "Soledad Rodriguez"
    },
    
  ];

  export const Verde = "#abc051";
  export const Azul = "#1a6fb7";


  export const getInitials = (fullName) => {
    const names = fullName.split(' ');
    const initials = names.map(name => name.charAt(0).toUpperCase()).join('');
    return initials;
  };

  export const extraerTipoImagen = (cadenaCompleta) => {
    const indicePunto = cadenaCompleta.lastIndexOf(".");

    // Extraer el tipo de imagen desde el final hasta el último punto
    const tipoImagen = cadenaCompleta.substring(indicePunto + 1);
  
    console.log(tipoImagen);
  
    return tipoImagen;
  }