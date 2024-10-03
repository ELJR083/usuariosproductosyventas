const express=require("express");
const productoRutas=require("./rutas/rutasProductos");
const usuariosRutas=require("./rutas/rutasUsuarios");
const ventasRutas=require("./rutas/rutasventas");
const app=express("express")
//vamos a poner que vamos aceptar los datos del formulario ponemos
app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.use("/p",productoRutas);
app.use("/",usuariosRutas);
app.use("/v",ventasRutas);

const port=process.env.PORT||3000;
app.listen(3000,()=>{
//console.log(port);
    console.log("eh https://localhost"+port);
})
