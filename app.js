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
    const {titulo,author,year}=req.body;
    const id=libros.length+1;
    if(titulo === undefined || year === undefined || author === undefined){
        return res.status(400).json({mensaje:'Todos los campos son necesarios'});
    }
    const encontrada = libros.find(libro => titulo === libro.titulo);

    if (encontrada) {
        console.log(`el libro ya esta agregado.`);
        return res.status(400).json({mensaje:'El libro ya esta agregado'});
    }
        else{
            
            libros.push({id:id,titulo:titulo,author:author,year:year});
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