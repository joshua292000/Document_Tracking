import NavBar from "./NavBar.js";
import { InputText } from 'primereact/inputtext';
import React, { useState, useRef,useEffect} from 'react';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import {useNavigate} from "react-router-dom";
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from "universal-cookie";


function formatDate(string){
    var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    var fec='';
    var stringFec="";
    var salida="";
    fec=new String(new Date(string).toLocaleString([],options));
    stringFec=fec.split("/");
    salida=fec[4]+fec[5]+fec[6]+fec[7]+","+fec[0]+","+fec[2];
    return salida;
}

export function Parametros() {
    const [nombre1, setNombre1] = useState('');
    const [identificacion1, setIdentificacion1] = useState('');
    const [tipoEm1, setTipoEm1] = useState('');
    const [date1, setDate1] = useState(new Date());
    const [correo1,setCorreo1]=useState('');
    const [visible, setVisible] = useState(false);
    const toast = useRef(null);
    const navegar = useNavigate();
    const cookies = new Cookies();


    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmación', detail: 'Usted a aceptado', life: 3000 });
        Actualizar();
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rechazado', detail: 'Usted no a aceptado', life: 3000 });
    }

    useEffect(() => {
        
        return()=>{(async()=>{
            axios.get('http://localhost:8080/api/v1/organizacion/findByIdorganizacion/'+cookies.get('organizacion_id'))
            .then(({data}) => {
                setNombre1({
                    ...nombre1, nom: data.user.Nombre
                });
                setIdentificacion1({
                    ...identificacion1,iden: data.user.Identificacion
                });
                setTipoEm1({
                    ...tipoEm1,tipo: data.user.Tipo
                });
                setDate1( {
                    ...date1,fec: formatDate(data.user.Fecha_Creacion)
                });
                setCorreo1({
                    ...correo1,correo: data.user.Correo
                });
                console.log(formatDate(data.user.Fecha_Creacion))
            
            }).catch(err => { Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La organizacion consultada no existe!',
            }) }
            ) 
        })();}              
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const Actualizar = () => {
        var organizacion={
            Identificacion: identificacion1.iden,
            Nombre: nombre1.nom,
            Fecha_Creacion: date1.fec,
            Tipo: tipoEm1.tipo,
            Correo: correo1.correo
          }
          console.log(organizacion)
          axios.put('http://localhost:8080/api/v1//organizacion/actualizarorganizacion/'+cookies.get('organizacion_id'), organizacion)
          .then(res => {
             Swal.fire('Felicidades', 'La organización se actualizo con exito')
             console.log(res)
          })
          
          .catch(err => { 
              Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se ha podido guardar la organización!',
          })
          console.log(err) 
        })
    }
  return (
    <div >
      <Toast ref={toast} />
      <NavBar name = {<span className='nav-text'>Departamentos </span>}/>
      <div id="divParametros">
        <h1 id="txtParametros">Información de la organización</h1>
        <fieldset id='fielidset'>
            <table id='tabla'>
            <tr>
                <td>
                <div className="field col-12 md:col-4" >
                <span className="p-float-label">
                    <InputText id="Nombre"  value={nombre1.nom} onChange={(e) => setNombre1({...nombre1,nom: e.target.value})}/>
                    <label  id="LabNombre" htmlFor="Nombre">Nombre de la organización</label>
                </span>
                </div>
                </td>
                <td>
                <div className="field col-12 md:col-4" >
                    <span className="p-float-label">
                    <InputText id="identificacion" keyfilter="num" value={identificacion1.iden} onChange={(e) => setIdentificacion1({...identificacion1,iden:e.target.value})}/>
                    <label  id="Labidentificacion" htmlFor="identificacion">Número de identificación</label>
                    </span>
                </div>
                </td>
            </tr>
            <tr>
                <td>
                <div className="field col-12 md:col-4">
                    <span className="p-float-label">
                    <Calendar  id="FCre"  value={new Date(date1.fec)}  onChange={(e) => setDate1({...date1,fec:e.value})} showIcon />
                    <label id = "LabFCre" htmlFor="FCre">Fecha de Creación</label>
                    </span>
                </div>
                </td>
                <td>
                <div className="field col-12 md:col-4" >
                    <span className="p-float-label">
                    <InputText id="TipoEm"  value={tipoEm1.tipo} onChange={(e) => setTipoEm1({...tipoEm1,tipo:e.target.value})}/>
                    <label id="LabTipoEm" htmlFor="TipoEm">Tipo de empresa</label>
                    </span>
                </div>
                </td>
            </tr>

            <tr>
                <td>
                <div className="field col-12 md:col-4" >
                    <span className="p-float-label">
                    <InputText id="Correo" keyfilter={/[^\s]/} value={correo1.correo}  onChange={(e) => setCorreo1({...correo1,correo:e.target.value})}/>
                    <label  id="LabCorreo" htmlFor="Correo">Correo Electronico</label>
                    </span>
                </div>
                </td>
                <td>
                <Button style={{width: "110px", height: "50px", fontSize: "15px",marginRight:'15px'}} onClick={() => console.log(date1)/* navegar("/Inicio")*/}icon="pi pi-sign-out"label="Atras" className="p-button-raised" />
                <ConfirmDialog visible={visible} onHide={() => setVisible(false)} message="¿Estas seguro que deseas continuar?"
                header="Actualizar" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
                <Button style={{width: "120px", height: "50px", fontSize: "15px"}} className="p-button-raised p-button-success"  onClick={() => setVisible(true)} icon="pi pi-send" label="Actualizar" />
                </td>
            </tr>
            </table>
        </fieldset>
      </div>
    </div>
  );
}