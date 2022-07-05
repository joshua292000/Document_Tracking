import React, { useState,useEffect } from 'react';
import { Timeline } from 'primereact/timeline';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import '../css/Seguimiento.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Dropdown } from 'primereact/dropdown';
import Cookies from "universal-cookie";
import { Badge } from 'primereact/badge';
import NavBar from './NavBar';

function formatDate(string){
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([],options);
}

export function TimelineDemo (){
   
    const [selectedCity1, setSelectedCity1] = useState('');

    const [nomTra, setNomTra] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);

    const onCityChange = (e) => {
        setSelectedCity1(e.value);
    }
    const cookies = new Cookies();
    
    useEffect(() => {
       
        return()=>{(async()=>{
            axios.get('http://localhost:8080/api/v1/caso/findByIdOrganizacion/'+cookies.get('organizacion_id'))
            .then(({data}) => {
                for(let i = 0; i < data.user.length; i++){   
                    const newUser = {
                        name: data.user[i].NombreCaso,
                        tra: data.user[i].Tramite_id,
                        FecIni: formatDate(data.user[i].CasosXDepartamento[0].FechaIniciod),
                        Fecfin: formatDate(data.user[i].CasosXDepartamento[0].FechaFind),
                    };
                    setNomTra((pre) => {
                    return [...pre, newUser];
                    });
                }
            
            }).catch(err => { Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La organizacion consultada no existe!',
            }) }
            ) 
        })();}              
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const customizedMarker = (item) => {
        return (
            <span className="custom-marker shadow-1" style={{ backgroundColor: item.color }}>
                <i className={item.icon}></i>
            </span>
        );
    };

    const customizedContent = (item) => {
        return (
            <Card style={{backgroundColor:item.seleccionado}} title={item.status} subTitle={item.date}>
                <p>Correo: {item.Correo} <br/> Telefono: {item.Tel} </p>
                <p>Fecha de ingreso al departamento:   {item.FechIni} <br/> <br/> Fecha estimada de salida:   {item.FectFin} </p>
                {}
            </Card>
        );
    };

    function BuscarTramite(){
     
        var idsel='';
        axios.get('http://localhost:8080/api/v1/tramite/findByIdtramite/'+selectedCity1.tra)
        .then(({data}) => {
            Swal.fire('Felicidades', 'El usuario se creo con exito')
  
                idsel=data.user.depaActual
                
                for(let i = 0; i < data.user.ciclo.length; i++){ 
                     axios.get('http://localhost:8080/api/v1/departamento/findByIddepartamento/'+data.user.ciclo[i].id_departamento)
                        .then(({data}) => {
                            Swal.fire('Felicidades', '')
                            
                            if(idsel===data.user._id){
                                const newDep = {
                                    status: data.user.Nombre, 
                                    date: data.user.Descripcion, 
                                    Correo: data.user.Correo,
                                    Tel: data.user.Telefono,
                                    FechIni:selectedCity1.FecIni,
                                    FectFin:selectedCity1.Fecfin,
                                    icon: 'pi pi-building', 
                                    color: '#9C27B0',
                                    seleccionado: '#D1F8DB'
                                };
                                setDepartamentos((pre)=>{ return [...pre,newDep];});
                            }else{
                                const newDep = {
                                    status: data.user.Nombre, 
                                    date: data.user.Descripcion, 
                                    Correo: data.user.Correo,
                                    Tel: data.user.Telefono,
                                    icon: 'pi pi-building', 
                                    color: '#9C27B0',
                                    seleccionado: '#FFFFFF'
                                };
                                setDepartamentos((pre)=>{ return [...pre,newDep];});
                            }
                           
                        }).catch(err => { Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'El Departamento consultado no existe!',
                        }) }
                        )
                }
            //}
        }).catch(err => { Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'La organizacion consultada no existe!',
        }) }
        )
       
    }
    return (
        <>
        <NavBar />
        <div className="timeline-demo"style={{ marginTop:'70px'}}>
            <h1 id='titulocaso'>Seguimiento de casos </h1>
            <div className="col-12 md:col-4" style={{marginBlock:'20px'}} >
                <div className="p-inputgroup" style={{width:'300px',fontSize:'50px', alignItems:'center', flexDirection:'column', marginTop:'10px',marginLeft:'10px'}}>
                    <h4 id='txtCaso'>Seleccione el caso a mostrar</h4>
                    <Dropdown style={{width:'200px',fontSize:'50px',marginLeft:'20px'}}value={selectedCity1} options={nomTra} onChange={onCityChange}  optionLabel="name" placeholder="Seleccione el caso" />
                    <Button style={{marginTop:'-33px',marginLeft:'270px',height:'35px'}} label="Search" onClick={()=>BuscarTramite()}/>
                    
                    {/*<InputText placeholder="Keyword" value={nomTra} onChange={(e) => setNomTra(e.target.value)}/>*/}
                </div>
            </div>
            
            <h4 id='titcaso'>Caso seleccinado: {selectedCity1.name}</h4>
            <div id='Divespe' >
            <Badge  className="mr-2" size="large" style={{marginTop:'10px',marginLeft:'-150px',backgroundColor:'#D1F8DB'}}></Badge>
            <h5 style={{marginTop:'-25px',marginLeft:'30px'}}>Departamento Actual</h5>
            <Badge  className="mr-2" size="large" style={{marginTop:'5px',marginLeft:'-150px',backgroundColor:'#FFFFFF'}}></Badge>
            <h5 style={{marginTop:'-25px',marginLeft:'30px'}}>Otros Departamentos</h5>
            
            </div>
            <Timeline value={departamentos} align="alternate" className="customized-timeline" marker={customizedMarker} content={customizedContent} />
           {/* <div className="card">
                
    </div>*/}
        </div>
        </>
    );
}