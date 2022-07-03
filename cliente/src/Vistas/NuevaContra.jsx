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

export function InfoCuenta() {
    
    const navegar = useNavigate();
   /* const link = (dir)=>{
        navegar("/"+dir.dir);
        
    }*/
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
        toast.current.show({ severity: 'info', summary: 'Confirmación', detail: 'Usted a aceptado', life: 3000 });
        AcualizarUsu();
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rechazado', detail: 'Usted no a aceptado', life: 3000 });

    }

    function AcualizarUsu(){
        var id='';
        axios.get('http://localhost:8080/api/v1/usuario/findByName/'+nomusuario)
        .then(({data}) => {
            //Swal.fire('Felicidades', 'El usuario se creo con exito')
            id=data.user[0]._id
            if(id.length>0){
                var usuario={
                    nombre_usuario:nomusuario,
                    contrasena:contra,
                    organizacion: data.user[0].organizacion
                }
                axios.put('http://localhost:8080/api/v1/usuario/actualizarUsuario/'+id,usuario)
                .then(res => {
                   Swal.fire('Felicidades', 'El usuario se actualizo con exito')
                   navegar("/");
                })
                .catch(err => { 
                    Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo actualizar el usuario!',
                })
              })
            }
          
        }).catch(err => { Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'La organizacion consultada no existe!',
        }) }
        )
    }

    return (
        <div id='divContra'>
        <Toast ref={toast} />
    
        <h1>Recuperación de la cuenta</h1>
        <div className="field col-12 md:col-4" >
        <span className="p-float-label">
            <InputText style={{marginTop: "10px"}} id="NomUsuario" value={nomusuario} onChange={(e) => setNomusuario(e.target.value)} />
            <label id="LabNomUsua"htmlFor="NomUsuario">Nombre de Usuario</label>
        </span>
        </div>
        <br />
        <br />
        <div className="field col-12 md:col-4">
        <span className="p-float-label">
        <Password id = "CambioContra"  value={contra} onChange={(e) => setContra(e.target.value)} header={header} footer={footer} />
        <label id="LabContra" htmlFor="Contraseña">Contraseña</label>
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