import {

    ListarUsuariosDB,
    agregarUsuarioDB,
    editarUsuarioDB,
    eliminarUsuarioDB,

} from './usuario.model.js';

export async function ListarUsuarios(req, res) {

    try {

        const usuario = await ListarUsuariosDB();

        res.status(200).send({
            status: "OK",
            data: usuario
        });
        
    } catch (error) {
        
        res.status(500).send({
            status: 'error',
            message: error.message
        });

    }
    
}

export async function agregarUsuario(req, res) {

    try {

        let data = req.body;
        
        const resultado = await agregarUsuarioDB(data);

        res.status(200).send({
            status: 'OK',
            data: resultado
        });

    } catch (error) {

        res.status(500).send({
            status: 'error',
            message: error.message
        });
        
    }
    
}

export async function editarUsuario(req, res) {

    try {

        let id = req.params.idUsuario;
        let data = req.body;
        
        const resultado = await editarUsuarioDB(id, data);

        res.status(200).send({
            status: 'OK',
            data: resultado
        });

    } catch (error) {
        
        res.status(500).send({
            status: 'error',
            message: error.message
        });

    }
    
}

export async function eliminarUsuario(req, res) {

    try {

        let id = req.params.idUsuario;
        let data = req.body;

        const  resultado = await eliminarUsuarioDB(id, data);

        res.status(200).send({
            status: 'OK',
            data: resultado
        });
        
    } catch (error) {

        res.status(500).send({
            status: 'error',
            message: error.message
        });
        
    }
    
}