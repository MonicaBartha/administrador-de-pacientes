import React, { Fragment, useState } from 'react';

const Formulario = () => {

    // Crear state de Citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });
    // State del error de los inputs. Inicia con false porque no hay error
    const [ error, actualizarError ] = useState(false);

    // Funcion que se ejecuta cada que un usuario escribe en un input
    const actualizarState = e => {
        actualizarCita({
            ...cita, 
            [e.target.name] : e.target.value
        })
    }
    // Extraer los valores (se agrega value a los inputs)
    const { mascota, propietario, fecha, hora, sintomas } = cita;

    // Cuando el usuario presiona Agregar cita
    const submitCita = e => {
        e.preventDefault(); // se usa para no agregar el query string al link 
        // Validar
          // trim no permite enviar el form con campos vacios
        if( mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || 
        hora.trim() === '' || sintomas.trim() === '') {
            // funcion del State del error
            actualizarError(true);
            return;
        }

        // Eliminar el mensaje previo
        actualizarError(false);
        // Asignar un ID
        console.log(cita);
        // Crear la cita

        // Reiniciar el form
    }
    return (
        <Fragment>
            <h2>Crear cita</h2>
            {/* si el error es true se muestra el <p> */}
            { error ? <p className="alerta-error">Todos los campos son obligatorios</p>
             : null}
            <form
            onSubmit={submitCita}>
                <label>Nombre Mascota</label>
                <input 
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={actualizarState}
                    value={mascota}
                />
                <label>Nombre Dueño</label>
                 <input 
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre dueño de la mascota"
                    onChange={actualizarState}
                    value={propietario}
                />
                <label>Fecha</label>
                <input 
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />
                <label>Hora</label>
                <input 
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />
                <label>Síntomas</label>
                <textarea 
                    className="u-full-width" 
                    name="sintomas"
                    onChange={actualizarState}
                    value={sintomas}>
                </textarea>
                <button
                    type="submit"
                    className="u-full-width button-primary">
                    Agregar cita</button>
            </form>
        </Fragment>
     );
}

export default Formulario;