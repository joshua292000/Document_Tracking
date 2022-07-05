import React from 'react'
import Cookies from "universal-cookie";
import LoadImage from '../login.png';
function NavBar() {

   
    const cookies = new Cookies();
    return (
        <div>
          <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="Inicio">    Inicio    </a>
                    
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="collapsibleNavbar" >
                    <ul class="navbar-nav"> 

                        <li class="nav-item" style={{paddingRight: "30px"}}>
                            <a class="nav-link"  href="Departamentos" >  Departamentos   </a>
                        </li>

                        <li class="nav-item" style={{paddingRight: "30px"}}>
                            <a class="nav-link"  href="Tramites">   Tramites  </a>
                        </li>

                        <li class="nav-item" style={{paddingRight: "30px"}} >
                            <a class="nav-link"  href="Casos">    Casos    </a>
                        </li>

                        <li class="nav-item" style={{paddingRight: "30px"}}>
                            <a class="nav-link"  href="Parametros">Parametros</a>
                        </li>

                        <li class="nav-item" style={{paddingRight: "30px"}}>
                            <a class="nav-link"  href="Seguimiento">Consulta Tracking</a>
                        </li>

                       
                      
                        <img  style={{width: "40px", height: "40px", marginLeft: "520px", marginTop: "5px"}} src={LoadImage} />


                        <li class="nav-item dropdown" >

                        <a class="nav-link dropdown-toggle" href="Inicio" role="button" data-bs-toggle="dropdown"  >Usuario: {cookies.get('nombreUsuario')}</a>
                        
                        <ul class="dropdown-menu"  >
                            <li>
                            <a class="dropdown-item" href="/" >Cerrar Sesion</a>
                            </li>

                        </ul>
                        </li>
                     


                    </ul>
                    </div>
                 </div>
            </nav>

             <div class="container-fluid mt-3">
            </div>
        </div>
    )
}


export default NavBar