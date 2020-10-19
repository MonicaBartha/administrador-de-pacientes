import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
 // revisa si no existen citas. Si no existen inicia con un arreglo vacio
 if(!citasIniciales) {
   citasIniciales = [];
 }
  // Arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales);

  // useEffect para realizar ciertas operaciones cuando el state cambia
  useEffect( () => {
  // Citas en local storage. JSON.parse transforma en string (localStorage lee solo strings)
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
   if(citasIniciales) {
     localStorage.setItem('citas', JSON.stringify(citas))
   } else {
     localStorage.setItem('citas', JSON.stringify([]));
   }
  }, [citas] );

  // Funcion que tome las citas actuales y agregue la nueva
  function crearCita(cita) {
    guardarCitas([
      ...citas,
      cita
    ]);
  }

  // Funcion que elimina un cita por su ID
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id );
    guardarCitas(nuevasCitas);
  }

  // Mensaje condicional con operator ternario. Titulo de la segunda columna
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus Citas';

  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario 
            crearCita={crearCita}
            />
            </div>
          <div className="one-half column">
            <h2>{titulo} </h2>
            {citas.map(cita => (
              <Cita
              key={cita.id}
              cita={cita}
              eliminarCita={eliminarCita} />
            ))}
            </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
