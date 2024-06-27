const express = require('express');

const app = express();

app.use(express.json());

let libros=[
    {id:1, titulo:'primer libro', autor:'Roa Luciano', year:2004},
    {id:2, titulo:'La Divina Comedia', autor:'marcelo ortega', year:2002},
    {id:3, titulo:'El Quijote', autor:'Ortiz Emilio', year:2005},
]

//get que sirve para traer todos los libros del array

app.get('/libros', (req,res) => {
    res.json(libros);
});

//get para traer un libro segun su id

app.get('/libros/:id', (req,res) => {
    const id= req.params.id;
    const libro = libros.find(libro => libro.id === parseInt(id));
    if(!libro){
        return res.status(404).json({mensaje:`Libro con id ${id} no encontrado`});
    }
    res.json(libro);
});

//


app.listen(3000,(req,res) => {
    console.log('servidor corriendo en el puerto 3000');});