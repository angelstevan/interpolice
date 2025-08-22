import conexion from '../../config/conexion.js';
import { GenerarCodigoQR } from './qrcode.js';


export async function ListarCiudadanosDB() {

    let [resultado] = await conexion.query("select * from ciudadano");
    return resultado;

}

export async function agregarCiudadanoDB(data) {

    let qr = await GenerarCodigoQR(data);

    if(qr.length > 0){

        data.codigoQR = qr;
        let [resultado] = await conexion.query("insert into ciudadano set ?", [data]);

        return resultado;

    }

}

export async function editarCiudadanoDB(id, data) {

    let qr = await GenerarCodigoQR(data);

    data.codigoQR = qr;

    let [resultado] = await conexion.query("update ciudadano set ? where codigo = ?",[data, id]);

    return resultado;
    
}

export async function eliminarCiudadanoDB(id, data) {
    
    let [resultado] = await conexion.query("update ciudadano set ? where codigo = ?", [data, id]);
    return resultado;

}