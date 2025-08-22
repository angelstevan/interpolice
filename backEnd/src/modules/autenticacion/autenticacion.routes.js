import express from 'express';
import {

    validarInformacion,

} from './autenticacion.controller.js';

const router = express.Router();

router.get("/validarInformacion", validarInformacion);

export default router;