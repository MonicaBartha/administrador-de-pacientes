### Administrador de pacientes de clinica veterinaria

Proyecto creado con React Hooks. <br>
CSS con Normalize y Skeleton <br>
La app:

- lee la informacion que el usuario ingresa
- valida el formulario
- cambia el estado de los inputs
- reinicia el formulario

#### Proceso

1. Creación del Componente Formulario que tiene su propio state
   <input 
                     type="text"
                     name="mascota"
                     className="u-full-width"
                     placeholder="Nombre Mascota"
                     onChange={actualizarState}
                     value={mascota}
                 />

- Creando state para citas
  El valor name={mascota} se usa en el state que inicia con un string vacio.

                const [cita, actualizarCita] = useState({
                    mascota: '',
                    propietario: '',
                    fecha: '',
                    hora: '',
                    sintomas: ''
                });

La función que actualiza el state se usa con un evento como **onChange**

                const actualizarState = e => {
                actualizarCita({

                        })
                    }

2.  Recuperar la info que el usuario agrega en los inputs
    se usa un evento **e** que trae la información,
    por ejemplo **e.target.name** trae el nombre de la mascota
    **e.target.value** el valor que ingresa el usuario en el input

                    const actualizarState = e => {
                        actualizarCita({
                            ...cita,
                            [e.target.name] : e.target.value
                        })
                    }

- Array destructuring para que la informacion se inscriba corectamente al input correspondiente:

              [e.target.name] : e.target.value

- Hay que agregar una **copia del state** para que se guarde toda la info, si no cuando se escribe en el segundo input, se reemplaza la informacion del primer input, no se guarda.<br>
  **...cita**<br>
  La informacion se extrae utilizando **destructuring:**

              const { mascota, propietario, fecha, hora, sintomas } = cita;

Las variables se relacionan a los inputs a traves de **value={mascota}**, etc

3.  Evento para leer cuando el usuario envie el formulario, boton **Agregar cita**
    La funcion **onSubmit={submitCita}** se agrega dentro del tag form.
    A la funcion se agrega el evento **preventDefault** para eliminar del link el query string que se evia by default:

                  const submitCita = e => {
                      e.preventDefault(); }

4.  Validación de formulario
    **.trim** asegura que los campos no están enviados vacios.
    Siempre en la validación hay que colocar un **return** para que no se continue ejecutando el código. Si hay input vacios, va marcar un error:

                    if( mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' ||
                            hora.trim() === '' || sintomas.trim() === '') {
                                // funcion del State del error
                                actualizarError(true);
                                return;
                            }

Para que el error sea visible para usuario, se agrega un state del error:

                const [ error, actualizarError ] = useState(false)

Al iniciar el formulario, el state es false porque no hay errores.
En caso que falla va validacion, se ejecuta **actualizarError(true);** y se muestra el mensaje:

                { error ? <p className="alerta-error">Todos los campos son obligatorios</p>
                            : null}

Despues de enviar en formulario, se debe reiniciar:

                actualizarError(false);

5. Asignando un ID (key) a las citas<br>
   Se instala la libreria **uuid** para que cada elemento tenga un elemento único.
