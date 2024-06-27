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
            res.json({mensaje: "el libro se agrego correctamente"})
        }
});

//PUT para modificar los datos de un libro

app.put('/libros/:id', (req,res) => {
    const id= req.params.id;
    const libroCargar=req.body;

    const libro = libros.find(libro => libro.id === parseInt(id));
    if(!libro){
        return res.status(404).json({mensaje:`Libro con id ${id} no encontrado`});
    }
    if(libroCargar.id!== undefined){
        console.log(`El id no puede ser modificado.`);
        return res.status(400).json({mensaje:'El id no puede ser modificado'});
    }
    const encontrarTit = libros.find(libro => libroCargar.titulo === libro.titulo);
    if (encontrarTit) {
        console.log(`el libro con el mismo titulo ya existe.`);
        return res.status(400).json({mensaje:'El libro con el mismo titulo ya existe'});
    }

    libro.titulo=libroCargar.titulo || libro.titulo;
    libro.autor=libroCargar.autor || libro.autor;
    libro.year=libroCargar.year || libro.year;

    res.json({mensaje :"el libro se modifico correctamente"});
});

//Delete para poder eliminar un libro

app.delete('/libros/:id', (req,res) => {
    const id= req.params.id;
    const libro = libros.find(libro => libro.id === parseInt(id));
    if(!libro){
        return res.status(404).json({mensaje:`Libro con id ${id} no encontrado`});
    }
    const index = libros.indexOf(libro);
    libros.splice(index, 1);
    res.json({mensaje: "El libro se ha eliminado correctamente"});
});


app.listen(3000,(req,res) => {
    console.log('servidor corriendo en el puerto 3000');});