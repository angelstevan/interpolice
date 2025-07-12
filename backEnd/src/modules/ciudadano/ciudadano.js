import express from 'express';
import conexion from '../../config/conexion.js';
import { GenerarCodigoQR } from './qrcode.js';

const ciudadano = express.Router();

ciudadano.get('/ciudadano/listarTodos',async(req,res)=>{

    try {
        
        let consulta = "select * from ciudadano";

        let [resultado] = await conexion.query(consulta);

        res.send({

            estado: "OK",
            data: resultado

        });

    } catch (error) {
        
        res.send({
            estado: "Error",
            data: error.message
        })

    }

})

ciudadano.post('/ciudadano/agregarCiudadano', async (req,res)=>{

    try {

        let datosFormulario = {

            codigo: req.body.codigo,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            apodo: req.body.apodo,
            fecha_nacimiento: req.body.fecha_nacimiento,
            planeta_origen: req.body.planeta_origen,
            planeta_residencia:  req.body.planeta_residencia,
            foto: req.body.foto,
            estado: req.body.estado

        }

        const qr = await GenerarCodigoQR(datosFormulario);

        if(qr.length > 0)
        {
           
            datosFormulario.codigoQR = qr;

             let consulta = "insert into ciudadano set ?";

            let [resultado] = await conexion.query(consulta,[datosFormulario]);

             res.send({
                estado: "OK",
                data: resultado,
                mensaje: `QR generado y guardado en ${qr}`
            })
        

        }

    } catch (error) {
        
        res.send({
            estado: "Error",
            data: error.message
        })

    }

})

ciudadano.put('/ciudadano/editarCiudadano/:codigo', async (req,res)=>{

    try {
        
        let codigo = req.params.codigo;

        let datosFormulario = {

            codigo: codigo,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            apodo: req.body.apodo,
            fecha_nacimiento: req.body.fecha_nacimiento,
            planeta_origen: req.body.planeta_origen,
            planeta_residencia:  req.body.planeta_residencia,
            foto: req.body.foto,
            estado: req.body.estado

        }

        // Generar el nuevo código QR
        const qr = await GenerarCodigoQR(datosFormulario);

        // Añadir el nombre del QR generado al formulario
        datosFormulario.codigoQR = qr;

        let consulta = "update ciudadano set ? where codigo = ?";

        let [resultado] = await conexion.query(consulta,[datosFormulario, codigo]);

        res.send({
            estado: "OK",
            data: resultado
        })


    } catch (error) {
        
        res.send({
            estado: "Error",
            data: error.message
        })

    }

})

ciudadano.put('/ciudadano/eliminarCiudadano/:codigo', async (req,res)=>{

    try {
        
        let codigo = req.params.codigo;

        let datosFormulario = {
            estado: req.body.estado
        }

        let consulta = "update ciudadano set ? where codigo = ?";

        let [resultado] = await conexion.query(consulta,[datosFormulario,codigo]);

        res.send({
            estado: "OK",
            data: resultado
        })

    } catch (error) {
        
        res.send({
            estado: "Error",
            data: error.message
        })

    }

})

export default ciudadano;