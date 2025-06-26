import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import ciudadano from './src/ciudadano.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// se globaliza la carpeta donde se guardan las imagenes de los qr
app.use('/qrcodes', express.static(__dirname + '/qrcode'));
app.use('/img', express.static(__dirname + 'img'));
app.use(express.json());
app.use(cors());

app.use("/", ciudadano);

// encendemos la api asignandole un puerto
let puerto = process.env.APP_PORT || 4100
app.listen(puerto,()=>{
    console.log(`api ejecutandose en el puerto ${puerto}`);
}); 
