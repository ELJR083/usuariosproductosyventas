const usuariosBD=require("./conexion").usuarios;
const Usuario =require("../clases/UsuarioClase");
const {encriptarPassword,validarPassword}=require("../middlewares/funcionesPassword")
function validardatos(usuario2){
    var datoscorrectos=false;
        if(usuario2.nombre!= undefined && usuario2.usuario!=undefined && usuario2.password!=undefined){ //valida y manda si es true o false
            datoscorrectos=true;

        }
    return datoscorrectos
}
async function mostrarUsuarios(){
    const usuarios=await usuariosBD.get();
    var usuariosValidos=[];
    //console.log(usuarios);
    usuarios.forEach(usuario => { //su variable tiene que se un arreglo
        //console.log(usuario.data());
        
        const usuario1= new Usuario({id:usuario.id,...usuario.data()});
        const usuario2=usuario1.getUsuario;
        if(validardatos(usuario2)){ //aqui manda el true o false
            usuariosValidos.push(usuario2);//aqui se mandan los usuarios validos
        }
       // console.log(usuariosValidos)   
    });
    return usuariosValidos;
    //console.log(usuariosValidos);
}
async function BuscarporId(id) {
    const usuario =  await usuariosBD.doc(id).get(); //se encarga de obtener el id y el doc(id) se encarga de buscarlo entre los documentos de la base de datos
    const usuario1= new Usuario({id:usuario.id,...usuario.data()});//crea un objeto, el primer atributo es el id y se le inserta el id que ya tine guardato y le agrega el siguiente objeto,los 3 puntos agregan los atributos del segundo objeto al primero
        var usuarioValido={error:true};
        if(validardatos(usuario1.getUsuario)){
            usuarioValido=usuario1.getUsuario;
        }
        return usuarioValido;
      //console.log(usuarioValido);
  //  console.log(usuario1.getUsuario);
 // console.log(usuario.data())  // como es una funcion lleva parentesis
 }  
async function nuevoUsuario(data){
   const {salt,hash}=encriptarPassword(data.password);
    data.password=hash;
    data.salt=salt;
    data.tipoUsuario="usuario";
    const usuario1=new Usuario(data);
   // console.log(data);
    var usuarioValido=false;
    console.log(usuario1.getUsuario);
    
    if(validardatos(usuario1.getUsuario)){
      await usuariosBD.doc().set(usuario1.getUsuario);  
      usuarioValido=true;
    }
  // return usuarioValido;
}
async function borrarUsuario(id) {
    const usuariob=await BuscarporId(id);
    ////console.log(usuariob);
    
    var borrado=false;
    if(usuariob.error!=true){
    //    console.log("kjhfkjsah");
        await usuariosBD.doc(id).delete();
        borrado=true;
    }
         return borrado;
}
//borrarUsuario("100");

/*data={
    nombre:"Pancho Villa",
    usuario:"pancho",
    password:"abc"
}
nuevoUsuario(data);
*/
//BuscarporId("Bgb72ikXEix1uI1RmH3g");//aqui puedes ingresar los ids para poder buscarlo
//BuscarporId("6GKu1THuaYW0xCpNVMUW");
//mostrarUsuarios();
module.exports={
    mostrarUsuarios,
    nuevoUsuario,
    borrarUsuario,
    BuscarporId
}