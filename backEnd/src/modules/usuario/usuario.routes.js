import express from 'express';
import {

    ListarUsuarios,
    agregarUsuario,
    editarUsuario,
    eliminarUsuario,

} from './usuario.controller.js';

const router = express.Router();

router.get("/traerTodos", ListarUsuarios);
router.post("/agregarUsuario", agregarUsuario);
router.put("/editarUsuario/:idUsuario", editarUsuario);
router.put("/eliminarUsuario/:idUsuario",eliminarUsuario);


export default router;