
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import React, { useState, useRef } from 'react';
import {useNavigate} from "react-router-dom";
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import Swal from 'sweetalert2';
export function InfoUsuarios() {
    
    const navegar = useNavigate();
    const link = (dir)=>{
        navegar("/"+dir.dir);
        
    }
      const [nomorganiza, setNomOrga] = useState('');
      const [contra, setContra] = useState('');
      const [nomusuario, setNomusuario] = useState('');

      const header = <h6>Elige una contraseña</h6>;
      const footer = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">Sugerencias</p>
            <ul className="pl-2 ml-2 mt-0" style={{lineHeight: '1.5'}}>
                <li>Al menos una minúscula</li>
                <li>Al menos una mayúscula</li>
                <li>Al menos un número</li>
                <li>Mínimo 8 caracteres</li>
            </ul>
        </React.Fragment>
    );
    const [visible, setVisible] = useState(false);
    const toast = useRef(null);
    const accept = () => {
        var id='';
        toast.current.show({ severity: 'info', summary: 'Confirmación', detail: 'Usted a aceptado', life: 3000 });
        GuardarUsu();
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rechazado', detail: 'Usted no a aceptado', life: 3000 });
    }
    function GuardarUsu(){
        var id='';
        axios.get('http://localhost:8080/api/v1/organizacion/findByName/'+nomorganiza)
        .then(({data}) => {
            Swal.fire('Felicidades', 'La organizacion consultada existe')
            console.log("primer " , data.user[0]._id)
            id=data.user[0]._id
            if(id.length>0){
                console.log("tercero " ,id)
                var usuario={
                    nombre_usuario:nomusuario,
                      contrasena:contra,
                      organizacion_id: id
                }
        
                
                console.log(usuario)
                axios.post('http://localhost:8080/api/v1/usuario/registrarusuario', usuario)
                .then(res => {
                   Swal.fire('Felicidades', 'El usuario se creo con exito')
                   console.log(res)
                   navegar("/");
                })
                
                .catch(err => { 
                    Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se ha podido guardar el usuario!',
                })
                console.log(err) 
              })
            }
            console.log("Segundo " , id)
          
        }).catch(err => { Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'La organizacion consultada no existe!',
        })
        console.log(err) }
        )
    }
    return (
        <div id="divUsu">
        <Toast ref={toast} />
        <br />
        <Button  style={{width: "150px", height: "50px", fontSize: "17px", marginBlock: "15px"}} className="p-button-rounded p-button-warning" aria-label="Organizacion" onClick={()=>link({dir:"Organizacion"})}>
            <i className="pi pi-building px-2"></i>
            <span className="px-3">Organizacion</span>
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button style={{width: "150px", height: "50px", fontSize: "17px", marginBlock: "15px"}} className="p-button-rounded p-button-info" aria-label="Usuarios" onClick={()=>link({dir:"Usuarios"})}>
            <i className="pi  pi-user px-2"></i>
            <span className="px-3">Usuarios</span>
        </Button>
        
    
        <h1>Información del Usuario</h1>

        <div className="field col-12 md:col-4">
        <span className="p-float-label">
            <InputText id="NomOrganizacion" value={nomorganiza} onChange={(e) => setNomOrga(e.target.value)} />
            <label id="LabNomOrganizacion" htmlFor="NomOrganizacion">Nombre de la organización</label>
        </span>
        </div>
        <br />
        <br />
        <div className="field col-12 md:col-4" >
        <span className="p-float-label">
            <InputText id="NomUsuario" value={nomusuario} onChange={(e) => setNomusuario(e.target.value)} />
            <label id="LabNomUsuario" htmlFor="NomUsuario">Nombre de Usuario</label>
        </span>
        </div>
        <br />
        <br />
        <div className="field col-12 md:col-4">
        <span className="p-float-label">
        <Password id= "ContraUsu" value={contra} onChange={(e) => setContra(e.target.value)} header={header} footer={footer} />
        <label id="LabContraseña" htmlFor="Contraseña">Contraseña</label>
        </span>
        </div>
        <br />
        <br />
        <ConfirmDialog visible={visible} onHide={() => setVisible(false)} message="¿Estas seguro que deseas continuar?"
            header="Guardar" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
        <Button style={{width: "120px", height: "50px", fontSize: "15px"}} onClick={() => setVisible(true)} icon="pi pi-save" label="Guardar" />
    </div>
        
    );
  }