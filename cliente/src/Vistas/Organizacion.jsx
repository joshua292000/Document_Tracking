import { InputText } from 'primereact/inputtext';
import React, { useState, useRef} from 'react';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import {useNavigate} from "react-router-dom";
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import Swal from 'sweetalert2';


export function InfoOrganizacion() {
    const [nombre, setNombre] = useState('');
    const [identificacion, setIdentificacion] = useState('');
    const [tipoEm, setTipoEm] = useState('');
    const [date, setDate] = useState(null);
    const [correo,setCorreo]=useState('');
    const navegar = useNavigate();
    const link = (dir)=>{
        navegar("/"+dir.dir);
        
    }
    const [visible, setVisible] = useState(false);
    const toast = useRef(null);
    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmación', detail: 'Usted a aceptado', life: 3000 });
        GuardarOrga();
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rechazado', detail: 'Usted no a aceptado', life: 3000 });
    }

    function GuardarOrga(){
      var organizacion={
        Identificacion: identificacion,
        Nombre: nombre,
        Fecha_Creacion: date,
        Tipo: tipoEm,
        Correo: correo
      }
      console.log(organizacion)
      axios.post('http://localhost:8080/api/v1/organizacion/registrar', organizacion)
      .then(res => {
         Swal.fire('Felicidades', 'La organización se creo con exito')
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
      <div id="divOrga" >
      <Toast ref={toast} />
      <br />
      <Button style={{width: "150px", height: "50px", fontSize: "17px", marginBlock: "15px"}} className="p-button-rounded p-button-raised p-button-warning" aria-label="Organizacion" onClick={()=>link({dir:"Organizacion"})}>
        <i className="pi pi-building px-2"></i>
        <span className="px-3">Organización</span>
      </Button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Button style={{width: "150px", height: "50px", fontSize: "17px", marginBlock: "15px"}} className="p-button-rounded p-button-raised p-button-info" aria-label="Usuarios" onClick={()=>link({dir:"Usuarios"})}>
        <i className="pi  pi-user px-2"></i>
        <span className="px-3">Usuarios</span>
      </Button>
      <h1>Información de la organización</h1>
      <fieldset id='fielidset'>
        <table id='tabla'>
          <tr>
            <td>
            <div className="field col-12 md:col-4" >
              <span className="p-float-label">
                <InputText id="Nombre"  value={nombre} onChange={(e) => setNombre(e.target.value)}/>
                <label  id="LabNombre" htmlFor="Nombre">Nombre de la organización</label>
              </span>
            </div>
            </td>
            <td>
              <div className="field col-12 md:col-4" >
                <span className="p-float-label">
                  <InputText id="identificacion" keyfilter="num" value={identificacion} onChange={(e) => setIdentificacion(e.target.value)}/>
                  <label  id="Labidentificacion" htmlFor="identificacion">Número de identificación</label>
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="field col-12 md:col-4">
                <span className="p-float-label">
                  <Calendar id="FCre" value={date} onChange={(e) => setDate(e.value)} showIcon />
                  <label id = "LabFCre" htmlFor="FCre">Fecha de Creación</label>
                </span>
              </div>
            </td>
            <td>
              <div className="field col-12 md:col-4" >
                <span className="p-float-label">
                  <InputText id="TipoEm"  value={tipoEm} onChange={(e) => setTipoEm(e.target.value)}/>
                  <label id="LabTipoEm" htmlFor="TipoEm">Tipo de empresa</label>
                </span>
              </div>
            </td>
          </tr>

          <tr>
            <td>
              <div className="field col-12 md:col-4" >
                <span className="p-float-label">
                  <InputText id="Correo" keyfilter={/[^\s]/} value={correo}  onChange={(e) => setCorreo(e.target.value)}/>
                  <label  id="LabCorreo" htmlFor="Correo">Correo Electronico</label>
                </span>
              </div>
            </td>
            <td>
              <ConfirmDialog visible={visible} onHide={() => setVisible(false)} message="¿Estas seguro que deseas continuar?"
              header="Guardar" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
              <Button style={{width: "120px", height: "50px", fontSize: "15px"}} className=" p-button-raised "onClick={() => setVisible(true)} icon="pi pi-save" label="Guardar" />
            </td>
          </tr>
        </table>
      </fieldset>
    </div>
    );
  }