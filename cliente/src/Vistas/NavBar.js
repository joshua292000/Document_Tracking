import React from 'react'
import Cookies from "universal-cookie";

function NavBar() {
    const tab = <> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>;
   
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


                        <li class="nav-item dropdown" style={{paddingLeft: "550px"}}>
                        <a class="nav-link dropdown-toggle" href="Inicio" role="button" data-bs-toggle="dropdown">Usuario: {cookies.get('nombreUsuario')}</a>
                        <ul class="dropdown-menu"  style={{marginLeft: "550px"}}>
                            <li>
                            <a class="dropdown-item" href="Departamentos" >Cerrar Sesion</a>
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