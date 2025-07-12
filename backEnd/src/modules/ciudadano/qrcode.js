import QRCode from 'qrcode';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function obtenerEstadoTexto(estado) {
    switch (estado) {
        case 0: return "Muerto";
        case 1: return "Vivo";
        case 2: return "Congelado";
        default: return "Desconocido";
    }
}

export async function GenerarCodigoQR(datosFormulario)
{

    let estado = obtenerEstadoTexto(datosFormulario.estado);

        const qrData = `
            Codigo: ${datosFormulario.codigo}
            Nombre: ${datosFormulario.nombre} ${datosFormulario.apellido}
            Apodo: ${datosFormulario.apodo || 'N/A'}
            Fecha de Nacimiento: ${datosFormulario.fecha_nacimiento}
            Planeta de Origen: ${datosFormulario.planeta_origen}
            Planeta de Residencia: ${datosFormulario.planeta_residencia}
            Estado: ${estado}
        `;

        const qrFolder = path.join(__dirname, '../../../qrcode');

        const fileName = `qr_${datosFormulario.codigo}.png`;
        const filePath = path.join(qrFolder, fileName);
        
         await QRCode.toFile(filePath, qrData, {
            color: {
            dark: '#000000',  // color QR
            light: '#FFFFFF'  // fondo
            }
        });

        return fileName;

}