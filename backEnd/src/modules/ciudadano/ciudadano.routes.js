import express from 'express';
import {

    ListarCiudadanos,
    agregarCiudadano, 
    editarCiudadano,
    eliminarCiudadano,

} from './ciudadano.controller.js';

const router = express.Router();

router.get("/listarTodos", ListarCiudadanos);
router.post("/agregarCiudadano", agregarCiudadano);
router.put("/editarCiudadano/:codigo", editarCiudadano);
router.put("/eliminarCiudadano/:codigo", eliminarCiudadano);

export default router;