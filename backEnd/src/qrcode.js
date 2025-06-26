import QRCode from 'qrcode';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function GenerarCodigoQR(datosFormulario)
{

    let estado = "";

        switch (datosFormulario.estado) {
            case 0:
                estado = "Muerto";
                break;
            case 1:
                estado = "Vivo";
                break;
            case 2:
                estado = "Congelado";
                break;
            default:
                break;
        }

        const qrData = `
            Codigo: ${datosFormulario.codigo}
            Nombre: ${datosFormulario.nombre} ${datosFormulario.apellido}
            Apodo: ${datosFormulario.apodo || 'N/A'}
            Fecha de Nacimiento: ${datosFormulario.fecha_nacimiento}
            Planeta de Origen: ${datosFormulario.planeta_origen}
            Planeta de Residencia: ${datosFormulario.planeta_residencia}
            Estado: ${estado}
        `;

        const qrFolder = path.join(__dirname, '../qrcode');

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