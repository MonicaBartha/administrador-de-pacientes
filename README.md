### Administrador de pacientes de clinica veterinaria

Link deploy: https://pacientes-veterinarios.netlify.app/
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

3.  Evento para leer cuando el usuario envie el formulario, boton **Agregar cita**<br>
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

Despues de enviar en formulario, se deben vaciar los inputs:

                actualizarError(false);

5. Asignando un ID (key) a las citas<br>
   Se instala la libreria **uuid** para que cada elemento tenga un key único.
   cita.id = uuid();

6. Creando un state principal en App.js de todas las citas, inicia con un arreglo vacio.
   const [citas, guardarCitas] = useState([]);

- creamos la funcion **crearCita()** que tome las citas actuales y agregue la nueva
- la funcion se pasa al componente Formulario como props
  <Formulario 
                  crearCita={crearCita}
                  />
  En el componente Formulario la funcion se pasa a traves del destructuring <br>
  const Formulario = **({crearCita})** => {

                crearCita(cita);

7.  Reiniciar el form

                actualizarCita({
                        mascota: '',
                        propietario: '',
                        fecha: '',
                        hora: '',
                        sintomas: ''
                })

8.  Mostrar el listado de citas<br>
    se utiliza un **.map** para iterar sobre las citas, después se llama el componente **Cita** donde se extrae toda la información de la cita: mascota, dueño, etc.
    <p>Mascota: <span>{cita.mascota}</span></p>
    <p>Dueño: <span>{cita.propietario}</span></p>
    <p>Fecha: <span>{cita.fecha}</span></p>
    <p>Hora: <span>{cita.hora}</span></p>
    <p>Síntomas: <span>{cita.sintomas}</span></p>

9.  Eliminar citas <br>
    Dentro del componente Cita se crea el boton Eliminar Cita.<br>
    Dentro de **App.js** se crea una función que elimina una cita por su ID. Esta función se agrega como props al componente Cita. La función usa un **.filter** que itera por todas las citas y que quede solo las citas que no tienen el id eliminado.

                    const eliminarCita = id => {
                        const nuevasCitas = citas.filter(cita => cita.id !== id );
                        guardarCitas(nuevasCitas);
                    }

                    <button
                        onClick={ () => eliminarCita(cita.id)}
                        className="button eliminar u-full-width"
                        >Eliminar &times;
                    </button>

10. Mensaje condicional <br>
    Se usa va variable titulo con un operador ternario: Si no hay citas (**citas.length === 0**), se muestra el mensaje "No hay citas", si hay cita se muestra "Administra tus citas". En App.js:

                    const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus Citas';

11. Agregar las citas en **localStorage**<br>
    Se usa **useEffect** para realizar operaciones cuando el state cambia.<br>
    **useEffect = componentDidMount y componentDidUpdate**<br>
    Local Storage almacena solo **strings**.<br>
    Se revisa si no hay citas (state inicial). En caso de que no, inicia con un arreglo vacio.<br>

                    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
                    if(!citasIniciales) {
                        citasIniciales = [];
                        }

**JSON.parse** transforma la informacion en **string**.<br>
**citasIniciales** pasa ser el state inicial:<br>

                const [citas, guardarCitas] = useState(citasIniciales);

                useEffect( () => {
                    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
                    if(citasIniciales) {
                        localStorage.setItem('citas', JSON.stringify(citas))
                    } else {
                        localStorage.setItem('citas', JSON.stringify([]));
                    }
                    }, [citas] );

12. Agregar PropTypes en el componente Cita y Formulario.<br>

                Formulario.propTypes = {
                    crearCita: PropTypes.func.isRequired
                }
