import express from 'express';
import conexion from '../../config/conexion.js';
import bcrypt from 'bcryptjs';

const autenticarse = express.Router();

autenticarse.get("/autenticarse/validarInformacion", async (req, res)=>{

    try {

        let correo = req.body.correo;
        let contraseña = req.body.contrasena;

        const [consultaVerificacion] = await conexion.query("SELECT * FROM usuario WHERE correo = ?",[correo]);

        if (consultaVerificacion.length > 0)
        {

            const siCoincide = bcrypt.compareSync(
                contraseña,
                consultaVerificacion[0].contrasena
            );

            if(siCoincide)
            {
                res.status(200).send({
                    status: "OK",
                    data: consultaVerificacion
                });

            }else{
                throw new Error("la clave ingresada no coincide !");
            }

        }else{
            throw new Error("El correo ingresado no existe !");
        }
        
    } catch (error) {
        
        res.status(500).send({
            status: 'error',
            message: error.message
        })

    }

});

export default autenticarse;