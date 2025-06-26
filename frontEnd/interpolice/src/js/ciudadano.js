import * as bootstrap from 'bootstrap';
import Swal from 'sweetalert2';

const url = "http://localhost:4100/ciudadano/";
const  contenido = document.querySelector("#contenido");

document.addEventListener('DOMContentLoaded', MostrarCiudadanos())

function MostrarCiudadanos()
{

    fetch(url + "listarTodos")
    .then((response) => response.json())
    .then((datos)=>{

        console.log(datos);
        llenarTabla(datos);

    })

}

function llenarTabla(datos)
{

    datos.data.forEach((dato) => {
        
        let tr = document.createElement("tr");
        let tdCodigo = document.createElement("td");
        let tdNombre = document.createElement("td");
        let tdApellido = document.createElement("td");
        let tdApodo = document.createElement("td");
        let tdFechaNacimiento = document.createElement("td");
        let tdPlanetaOrigen = document.createElement("td");
        let tdPlanetaResidencia = document.createElement("td");
        let tdFoto = document.createElement("td");
        let tdCodigoQR = document.createElement("td");
        let fotoQR = document.createElement("img");
        let tdEstado = document.createElement("td");
        let tdAcciones = document.createElement("td");
        let tdBotonEditar = document.createElement("td");
         let iconBotonEditar = document.createElement("i");
        iconBotonEditar.classList.add("bi", "bi-pencil-fill"); 
        tdBotonEditar.classList.add("btn", "btn-warning", "me-1");
        tdBotonEditar.setAttribute('data-bs-toggle', 'modal');
        tdBotonEditar.setAttribute("data-bs-target", "#EditarModal");
        tdBotonEditar.appendChild(iconBotonEditar);

        tdBotonEditar.addEventListener('click',()=>{
            editarCiudadano(dato)
        });

        let tdBotonEliminar = document.createElement("td");
        let iconBotonEliminar = document.createElement("i");
        iconBotonEliminar.classList.add("bi", "bi-trash3-fill");
        tdBotonEliminar.classList.add("btn", "btn-danger");
        tdBotonEliminar.appendChild(iconBotonEliminar);

        tdBotonEliminar.addEventListener('click',()=>{
            eliminarCiudadano(dato)
        });

        switch (dato.estado) {
            case 0:
                tdEstado.textContent = "Muerto";
                break;
            case 1:
                tdEstado.textContent = "Vivo";
                break;
            case 2:
                tdEstado.textContent = "Congelado";
                break;
            default:
                break;
        }

        tdCodigo.textContent = dato.codigo;
        tdNombre.textContent = dato.nombre;
        tdApellido.textContent = dato.apellido;
        tdApodo.textContent = dato.apodo;
        tdFechaNacimiento.textContent = dato.fecha_nacimiento;
        tdPlanetaOrigen.textContent = dato.planeta_origen;
        tdPlanetaResidencia.textContent = dato.planeta_residencia;
        tdFoto.textContent = dato.foto;
        fotoQR.src = "http://localhost:4100/qrcodes/" + dato.codigoQR;
        fotoQR.height = 100;
        fotoQR.width = 100;
        tdCodigoQR.appendChild(fotoQR);
        tdAcciones.append(tdBotonEditar,tdBotonEliminar);
        tr.append(tdCodigo, tdNombre, tdApellido, tdApodo, tdFechaNacimiento, tdPlanetaOrigen, tdPlanetaResidencia, tdFoto, tdCodigoQR, tdEstado, tdAcciones);
        contenido.appendChild(tr);

    });

}

// agregar ciudadano

const formularioAgregar = document.querySelector("#FormularioAgregar");

formularioAgregar.addEventListener('submit',(e)=>{

    e.preventDefault();

    const codigo = document.querySelector("#codigo").value;
    const nombre = document.querySelector("#nombre").value;
    const apellido = document.querySelector("#apellido").value;
    const apodo = document.querySelector("#apodo").value;
    const estado = document.querySelector("#estado").value;
    const fechaNacimiento = document.querySelector("#fechaNacimiento").value;
    const palnetaOrigen = document.querySelector("#palnetaOrigen").value;
    const planteResidencia = document.querySelector("#planteResidencia").value;
    //const foto = document.querySelector("#foto").value;

    const datos = JSON.stringify({
        codigo: codigo,
        nombre: nombre,
        apellido: apellido,
        apodo: apodo,
        estado: estado,
        fecha_nacimiento: fechaNacimiento,
        planeta_origen: palnetaOrigen,
        planeta_residencia: planteResidencia
    })

    fetch(url+"agregarCiudadano", {
        method : "POST",
        headers: {
            "Content-Type": "application/json" 
        },
        body : datos,
    })
    .then(response => response.json())
    .then((dato)=>{

        formularioAgregar.reset();

        Swal.fire({
            title: "Agregado!",
            text: "El ciudadano se agrego con exito!",
            icon: "success"
        });

        recargar()
    })

})

// editar Ciudadano

function editarCiudadano(dato)
{

    document.querySelector("#codigoEditar").value = dato.codigo;
    document.querySelector("#nombreEditar").value = dato.nombre;
    document.querySelector("#apellidoEditar").value = dato.apellido;
    document.querySelector("#apodoEditar").value = dato.apodo;
    document.querySelector("#estadoEditar").value = dato.estado;
    document.querySelector("#fechaNacimientoEditar").value = dato.fecha_nacimiento;
    document.querySelector("#palnetaOrigenEditar").value = dato.planeta_origen;
    document.querySelector("#planteResidenciaEditar").value = dato.planeta_residencia;

    const FormularioEditar = document.querySelector("#FormularioEditar");

    FormularioEditar.addEventListener('submit',(e)=>{

        e.preventDefault();

        const codigo = document.querySelector("#codigoEditar").value;

        let datos = JSON.stringify({

            nombre: document.querySelector("#nombreEditar").value,
            apellido: document.querySelector("#apellidoEditar").value,
            apodo: document.querySelector("#apodoEditar").value,
            estado: document.querySelector("#estadoEditar").value,
            fecha_nacimiento: document.querySelector("#fechaNacimientoEditar").value,
            planeta_origen: document.querySelector("#palnetaOrigenEditar").value,
            planeta_residencia: document.querySelector("#planteResidenciaEditar").value

        });

        fetch(url+"editarCiudadano/"+codigo,{
            method : "PUT",
            headers: {
                "Content-Type": "application/json" 
            },
            body : datos,
        })
        .then(response => response.json())
        .then((dato)=>{

            Swal.fire({
            title: "Editado!",
            text: "El ciudadano se edito con exito!",
            icon: "success"
            });

        recargar()
        
        })


    })

}

// eliminar Ciudadano

function eliminarCiudadano(dato)
{

    const codigo = dato.codigo;

    let datos = JSON.stringify({
        estado: 0,
    })

    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, Eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
    if (result.isConfirmed) {
        
        fetch(url+"eliminarCiudadano/"+codigo,{
            method : "PUT",
            headers: {
                "Content-Type": "application/json" 
            },
            body : datos,
        })
        .then(response => response.json())
        .then((dato) => {

         Swal.fire({
            title: "Eliminado!",
            text: "El ciudadano se elimino con exito!",
            icon: "success"
        });

        recargar()

    })
    }

  });

    
}

function recargar()
{
    contenido.innerHTML  = '';
    MostrarCiudadanos();
}
