const express = require ('express');
const app = express();
const axios = require('axios');


const userRoutes= require('./routes/user-routes')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views','./views')
app.set('view engine', 'ejs')

app.use('/',userRoutes);

app.get('/home',(req,res)=>{
    axios.get('http://localhost:3000/')
    .then (resaxios=>{
        res.render('home', {data:resaxios.data.data})
    })
})

app.get('/register',(req,res)=>{
        res.render('register', )
})

app.get('/detail/:id',(req,res)=>{
    var angka = req.path.split('/')
    var id = angka[2]
    axios.get('http://localhost:3000/users/'+id)
    .then (resaxios=>{
        res.render('detail', {data:resaxios.data.data})
    })
})

app.get('/edit/:id',(req,res)=>{
    var angka = req.path.split('/')
    var id = angka[2]
    axios.get('http://localhost:3000/users/'+id)
    .then (resaxios=>{
        res.render('edit', {data:resaxios.data.data})
    })
})

app.get('/delete/:id',(req,res)=>{
    var angka = req.path.split('/')
    var id = angka[2]
    axios.get('http://localhost:3000/users/'+id)
    .then (resaxios=>{
        res.render('delete', {data:resaxios.data.data})
    })
})

app.listen(3000, ()=>{
    console.log("Server is running on port", 3000);
})