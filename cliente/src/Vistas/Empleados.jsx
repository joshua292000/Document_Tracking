import { Button } from 'primereact/button';
import Swal from 'sweetalert2'
import React, { useState } from 'react'
import uniquid from 'uniquid'
import axios from 'axios'
import NavBar from './NavBar';


export function IngresarEmpleado() {

    const [Identificacion, setIdentificacion] = useState('')
    const [Nombre , setNombre] = useState('')
    const [PApellido, setPApellido] = useState('')
    const [SApellido, setSApellido] = useState('')
    const [FecNaci, setFecNaci] = useState('A')
    const [Edad, setEdad] = useState('')

    const [Nacionalidad, setNacionalidad] = useState('')
    const [direccion , setDireccion] = useState('')
    const [Correo, setCorreo] = useState('')
    const [Telefono, setTelefono] = useState('')
    const [rol, setRol] = useState('')
    const [rolId, setRolId] = useState('')
    const [departamento, setDepartamento] = useState('')


    function agregarEmpleado() {

       var dataroles = '';
       var datadepartamento = '';
        

        if(rol.length > 0 && departamento.length >0){

            axios.get('http://localhost:8080/api/v1/roles/findByName/'+rol)
            .then(({data}) => {
                console.log("primer " , data.user[0]._id)
                 dataroles = data.user[0]._id
                
                 if(dataroles.length > 0){   
    
                    axios.get('http://localhost:8080/api/v1/departamento/findByName/'+departamento)
                    .then(({data}) => {
                        console.log("primer d " , data.user[0]._id)
                         datadepartamento = data.user[0]._id
                        
                        if(datadepartamento.length > 0){
                    
                            var empleado = {
                        
                                Identificacion: Identificacion,
                                Nombre: Nombre,
                                PApellido: PApellido,
                                SApellido: SApellido,
                                FecNaci: FecNaci,
                    
                                Edad: Edad,
                                Nacionalidad: Nacionalidad,
                                direccion: direccion,
                                Correo: Correo,
                    
                                Telefono: Telefono,
                                rol: dataroles,
                                departamento: datadepartamento
                        
                            }
            
                            axios.post('http://localhost:8080/api/v1/persona/crearpersona', empleado)
                                .then(res => {
                                    Swal.fire('Felicidades', 'El empleado se creo con exito')
                                })
                                .catch(err => { 
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Error',
                                        text: 'No se ha podido guardar el empleado!',
                                    })
                                    console.log(err) })
                         }
                      
                    }).catch(err => { console.log(err) }
                    )}
            }
            )

        }

    }
    return (
        <>
        <NavBar />
        <div className='container'>

        <div className='row'>
            <h2 className='mt-4'> Crear nuevo Empleado</h2>
        </div>

        <div className='row'>
            <div className='col-sm-6 offset-3'>

                <div className='mb-3'>
                    <label htmlFor='Identificacion' className='form-label'>Identificacion</label>
                    <input type="text" className='form-control' value={Identificacion} onChange={(e) => { setIdentificacion(e.target.value) }}></input>
                </div>

                <div className='mb-3'>
                    <label htmlFor='Nombre' className='form-label'>Nombre</label>
                    <input type="text" className='form-control' value={Nombre} onChange={(e) => { setNombre(e.target.value) }}></input>
                </div>

                <div className='mb-3'>
                    <label htmlFor='PApellido' className='form-label'>PApellido</label>
                    <input type="text" className='form-control' value={PApellido} onChange={(e) => { setPApellido(e.target.value) }}></input>
                </div>

                <div className='mb-3'>
                    <label htmlFor='SApellido' className='form-label'>SApellido</label>
                    <input type="text" className='form-control' value={SApellido} onChange={(e) => { setSApellido(e.target.value) }}></input>
                </div>


                <div className='mb-3'>
                    <label htmlFor='FecNaci' className='form-label'>FecNaci</label>
                    <input type="date" className='form-control' value={FecNaci} onChange={(e) => { setFecNaci(e.target.value) }}></input>
                </div>

                <div className='mb-3'>
                    <label htmlFor='Edad' className='form-label'>Edad</label>
                    <input type="text" className='form-control' value={Edad} onChange={(e) => { setEdad(e.target.value) }}></input>
                </div>

                <div className='mb-3'>
                    <label htmlFor='Nacionalidad' className='form-label'>Nacionalidad</label>
                    <input type="text" className='form-control' value={Nacionalidad} onChange={(e) => { setNacionalidad(e.target.value) }}></input>
                </div>

                <div className='mb-3'>
                    <label htmlFor='direccion' className='form-label'>direccion</label>
                    <input type="text" className='form-control' value={direccion} onChange={(e) => { setDireccion(e.target.value) }}></input>
                </div>


                <div className='mb-3'>
                    <label htmlFor='Correo' className='form-label'>Correo</label>
                    <input type="correo" className='form-control' value={Correo} onChange={(e) => { setCorreo(e.target.value) }}></input>
                </div>

                <div className='mb-3'>
                    <label htmlFor='Telefono' className='form-label'>Telefono</label>
                    <input type="text" className='form-control' value={Telefono} onChange={(e) => { setTelefono(e.target.value) }}></input>
                </div>

                <div className='mb-3'>
                    <label htmlFor='rol' className='form-label'>rol</label>
                    <input type="text" className='form-control' value={rol} onChange={(e) => { setRol(e.target.value) }}></input>
                </div>

                <div className='mb-3'>
                    <label htmlFor='departamento' className='form-label'>departamento</label>
                    <input type="text" className='form-control' value={departamento} onChange={(e) => { setDepartamento(e.target.value) }}></input>
                </div>


                <button onClick={agregarEmpleado} className='btn btn-success'>Guardar Empleado</button>

            </div>
        </div>
    </div>

    </>
    );
  }