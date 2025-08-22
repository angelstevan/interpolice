import {

    validarInformacionDB,

} from './autenticacion.model.js';

export async function validarInformacion(req, res) {

    try {
        
        let data = req.body;
        
        const resultado = await validarInformacionDB(data);

        res.status(200).send({
            status: "OK",
            data: resultado
        });

    } catch (error) {
        
        res.status(500).send({
            status: 'error',
            message: error.message
        });

    }
    
}
