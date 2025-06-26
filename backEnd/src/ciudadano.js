import express from 'express';
import conexion from './conexion.js';
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

        const qr = GenerarCodigoQR(datosFormulario);

        if(qr.length > 0)
        {
            let datosFormulario = {

            codigo: req.body.codigo,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            apodo: req.body.apodo,
            fecha_nacimiento: req.body.fecha_nacimiento,
            planeta_origen: req.body.planeta_origen,
            planeta_residencia:  req.body.planeta_residencia,
            foto: req.body.foto,
            codigoQR: `${qr}`,
            estado: req.body.estado

        }

        let consulta = "insert into ciudadano set ?";

        let [resultado] = await conexion.query(consulta,[datosFormulario]);

        res.send({
            estado: "OK",
            data: resultado,
            mensaje: `QR generado y guardado en ${filePath}`
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

            nombre: req.body.nombre,
            apellido: req.body.apellido,
            apodo: req.body.apodo,
            fecha_nacimiento: req.body.fecha_nacimiento,
            planeta_origen: req.body.planeta_origen,
            planeta_residencia:  req.body.planeta_residencia,
            foto: req.body.foto,
            estado: req.body.estado

        }

        let consulta = "update ciudadano set ? where codigo = ?";

        let [resultado] = await conexion.query(consulta,[datosFormulario,codigo]);

        // Regenerar el contenido del QR con los datos nuevos
        const qrData = `
            Codigo: ${codigo}
            Nombre: ${req.body.nombre} ${req.body.apellido}
            Apodo: ${req.body.apodo || 'N/A'}
            Fecha de Nacimiento: ${req.body.fecha_nacimiento}
            Planeta de Origen: ${req.body.planeta_origen}
            Planeta de Residencia: ${req.body.planeta_residencia}
            Estado: ${req.body.estado}
        `;

        // Definir ruta del archivo QR para sobrescribir
        const qrFolder = path.join(__dirname, '../qrcode');
        const fileName = `qr_${codigo}.png`;
        const filePath = path.join(qrFolder, fileName);

        // Generar el nuevo código QR y sobrescribir archivo existente
        await QRCode.toFile(filePath, qrData, {
            color: {
            dark: '#000000',
            light: '#FFFFFF'
        }
        });

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