import {

    ListarCiudadanosDB,
    agregarCiudadanoDB,
    editarCiudadanoDB,
    eliminarCiudadanoDB,

} from './ciudadano.model.js';

export async function ListarCiudadanos(req, res) {
    
    try {

        const ciudadano = await ListarCiudadanosDB();

         res.status(200).send({
            estado: "OK",
            data: ciudadano,
        });
        
    } catch (error) {
        
        res.send({
            estado: "Error",
            data: error.message
        })

    }

}

export async function agregarCiudadano(req, res) {
    
    try {
        
        let data = req.body;

        const resultado = await  agregarCiudadanoDB(data);

        res.status(200).send({
            estado: "OK",
            data: resultado,
        });


    } catch (error) {
        
         res.send({
            estado: "Error",
            data: error.message
        });

    }

}

export async function editarCiudadano(req, res) {

    try {

        let id = req.params.codigo;
        let data = req.body;

        const resultado = await editarCiudadanoDB(id, data);
        
        res.status(200).send({
            estado: "OK",
            data: resultado
        });

    } catch (error) {

        res.send({
            estado: "Error",
            data: error.message
        });
        
    }
    
}

export async function eliminarCiudadano(req, res) {

    try {

        let id = req.params.codigo;
        let data = req.body;

        const resultado = await eliminarCiudadanoDB(id, data);

         res.status(200).send({
            estado: "OK",
            data: resultado
        });
        
    } catch (error) {

        res.send({
            estado: "Error",
            data: error.message
        });
        
    }
    
}

