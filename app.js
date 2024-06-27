const express = require('express');

const app = express();

app.use(express.json());

let libros = [
    libros:[
        {
            id: 1,
            titulo: 'El Señor de los Anillos',
            autor: 'J.R.R. Tolkien',
            editorial: 'Panini Books',
            anio: 1954
        },
        {
            id: 2,
            titulo: 'El Quijote de la Mancha',
            autor: 'Miguel de Cervantes',
            editorial: 'Emece',
            anio: 1813
        },
        {
            id: 3,
            titulo: 'La Divina Comedia',
            autor: 'Miguel de Cervantes',
            editorial: 'Emece',
            anio: 1605
        }
    ]
]