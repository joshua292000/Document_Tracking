import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import React, { useState} from 'react';
import { useContext } from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button } from 'primereact/button';
//import { AppContext } from '../AppContext/providerOrganizacion';
import Cookies from "universal-cookie";
import logIn from '../login.png';

export function Logig() {
      ///const [stateApp, setStateApp] = useContext(AppContext);
      const [value1, setValue1] = useState('');
      const [value2, setValue2] = useState('');
      const navegar = useNavigate();
      let url="";
      const link = (dir)=>{
            navegar("/"+dir.dir);
    }

    function InicioSesion(){
        axios.get('http://localhost:8080/api/v1/usuario/findByNameAndPassword/'+value1+'/'+ value2)
        .then(({data}) => {
          const cookies = new Cookies();


          cookies.set('nombreUsuario', data.user[0].nombre_usuario, {path: '/'});
          cookies.set('contrasena', data.user[0].contrasena, {path: '/'});
          cookies.set('organizacion_id', data.user[0].organizacion_id, {path: '/'});
          cookies.set('usuarioAdminId', data.user[0]._id, {path: '/'});
     

          Swal.fire('Felicidades', 'El Usuaio fue encontrado')
            link({dir:"Inicio"});
            axios.get('http://localhost:8080/api/v1/usuario/findByName/'+value1)
              .then(({data}) => {
                  //Swal.fire('Felicidades', 'El usuario se creo con exito')
                 // setStateApp(data.user[0].organizacion);
              }).catch(err => { Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'La organizacion consultada no existe!',
              }) }
              )
        })
        .catch(err => { 
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se ha podido encontrar el usuario!',
          }) 
        })
    
    }
    return (
      <div id="divroot">
      <img id="imgLog" src={logIn}></img>
      <h1  id="titulo">Inicio de sesi??n</h1>
      <p id="msj">Por favor ingrese su nombre de usuario y contrase??a</p>
      <div className="field col-12 md:col-4" >
        <span className="p-float-label">
          <InputText id="Usuario" value={value1} onChange={(e) => setValue1(e.target.value)} />
           <label id="LaUsuario" htmlFor="Usuario">Usuario</label>
        </span>
      </div>
      <br />
      <br />
      <div className="field col-12 md:col-4">
       <span className="p-float-label">
        <Password inputId="Contrase??a" value={value2} onChange={(e) => setValue2(e.target.value)}/>
        <label id="LaContrase??a" htmlFor="Contrase??a">Contrase??a</label>
       </span>
      </div>
      <br />
      <a id="urlregistro" href={url} onClick={()=>link({dir:"Organizacion", nom:"url"})} >Registrarse</a><br /><br />
      <a id="urlcontra" href={url} onClick={()=>link({dir:"Cuenta", nom:"url"})} >Olvido la contrase??a?</a><br /><br />
      <Button style={{width: "120px", height: "50px", fontSize: "15px"}} label="Iniciar sesi??n" className="p-button-rounded"  onClick={()=>InicioSesion()} />
    </div>
    );
  }