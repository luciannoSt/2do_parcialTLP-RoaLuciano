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

//Post para añadir un nuevo libro al array

app.post('/libros', (req,res) => {
    const libroCargar=req.body;
    const idLibro=req.body.id;
    console.log(libroCargar);
    if(libroCargar.id === undefined || libroCargar.titulo === undefined || libroCargar.year === undefined){
        return res.status(400).json({mensaje:'Todos los campos son necesarios'});
    }
    const encontrada = libros.find(libro => libroCargar.titulo === libro.titulo);
    const encontrarID= libros.find(libro => idLibro === parseInt(libro.id))

    if (encontrada) {
        console.log(`el libro ya esta agregado.`);
        return res.status(400).json({mensaje:'El libro ya esta agregado'});
    }
        if(encontrarID){
            console.log(`El id ya esta en uso.`);
            return res.status(400).json({mensaje:'El id ya esta en uso'});
        }
        else{
            libros.push(libroCargar);
            console.log(` el libro se ha agregado correctamente.`);
            res.json({message: "el libro se agrego correctamente"})
        }
});




app.listen(3000,(req,res) => {
    console.log('servidor corriendo en el puerto 3000');});