import express from 'express';
import conexion from '../../config/conexion.js';
import bcrypt from 'bcryptjs';

const usuario = express.Router();

usuario.get('/usuario/traerTodos', async (req,res)=>{

    try {

        let consulta = "SELECT usuario.nombre, usuario.fechaIngreso, usuario.estado, usuario.correo, rol.nombre as nombreRol FROM usuario JOIN rol ON rol.idRol = usuario.idRol";

        let [resultado] = await conexion.query(consulta);

        res.status(200).send({
            status: "OK",
            data: resultado
        })

        
    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: error.message
        })
    }

});

usuario.post("/usuario/agregarUsuario", async (req, res)=>{

    try {

        let datosFormulario = {

            nombre: req.body.nombre,
            fechaIngreso: req.body.fechaIngreso,
            contrasena: bcrypt.hashSync(req.body.contrasena, 11),
            correo: req.body.correo,
            estado: req.body.estado,
            idRol: req.body.idRol

        }

        let consulta = "INSERT INTO usuario SET ?";

        let [resultado] = await conexion.query(consulta, [datosFormulario]);

        res.status(200).send({
            status: 'OK',
            data: resultado
        })
        
    } catch (error) {
        
        res.status(500).send({
            status: 'error',
            message: error.message
        })

    }

});

usuario.put("/usuario/editarUsuario/:idUsuario", async (req, res)=>{

    try {

        let id = req.params.idUsuario;

        let datosFormulario = {

            nombre: req.body.nombre,
            fechaIngreso: req.body.fechaIngreso,
            contrasena: bcrypt.hashSync(req.body.contrasena, 11),
            correo: req.body.correo,
            estado: req.body.estado,
            idRol: req.body.idRol

        }
        
        let consulta = "UPDATE usuario SET ? WHERE idUsuario = ?";

        let [resultado] = await conexion.query(consulta, [datosFormulario, id]);

        res.status(200).send({
            status: 'OK',
            data: resultado
        })

        
    } catch (error) {
        
        res.status(500).send({
            status: 'error',
            message: error.message
        })

    }

});

usuario.put("/usuario/eliminarUsuario/:idUsuario", async (req, res)=>{

    try {

        let id = req.params.idUsuario;

        let datosFormulario = {
            estado: req.body.estado
        }

        let consulta = "UPDATE usuario SET ? WHERE idUsuario = ?";

        let [resultado] = await conexion.query(consulta, [datosFormulario, id]);

        res.status(200).send({
            status: 'OK',
            data: resultado
        })
        
    } catch (error) {
        
        res.status(500).send({
            status: 'error',
            message: error.message
        })

    }

});

export default usuario;