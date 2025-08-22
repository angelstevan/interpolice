import conexion from '../../config/conexion.js';
import bcrypt from 'bcryptjs';

export async function ListarUsuariosDB() {

    let [resultado] = await conexion.query("SELECT usuario.nombre, usuario.fechaIngreso, usuario.estado, usuario.correo, rol.nombre as nombreRol FROM usuario JOIN rol ON rol.idRol = usuario.idRol");

    return resultado;

}

export async function agregarUsuarioDB(data) {

    let correo = data.correo;

    const correoExiste = await conexion.query("SELECT * FROM usuario WHERE correo = ?", [correo]);
    
    if(correoExiste.length > 0){

        throw Error("El email ya esta asignado a otro usuario");

    }
    
    let usuarioNuevo = {
        nombre: data.nombre,
        fechaIngreso: data.fechaIngreso,
        contrasena: bcrypt.hashSync(data.contrasena, 11),
        correo: data.correo,
        estado: data.estado,
        idRol: data.idRol
    }

    let [resultado] = await conexion.query("INSERT INTO usuario SET ?", [usuarioNuevo]);

    return resultado;

}

export async function editarUsuarioDB(id, data) {

    let [resultado] = await conexion.query("UPDATE usuario SET ? WHERE idUsuario = ?", [data, id]);

    return resultado;
    
}

export async function eliminarUsuarioDB(id, data) {

    let [resultado] = await conexion.query("UPDATE usuario SET ? WHERE idUsuario = ?", [data, id]);
    
    return resultado;
}