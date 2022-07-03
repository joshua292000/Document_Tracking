import React from 'react'


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
    
    return (
        <div>
          <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="Bienvenidos">Inicio </a>
                    
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul class="navbar-nav"> 
                        <li class="nav-item" >
                            <a class="nav-link"  href="Departamentos">Departamentos</a>
                        </li>

                        <li class="nav-item" >
                            <a class="nav-link"  href="Tramites">Tramites</a>
                        </li>

                        <li class="nav-item" >
                            <a class="nav-link"  href="Casos">Casos</a>
                        </li>

                        <li class="nav-item" >
                            <a class="nav-link"  href="Parametros">Parametros</a>
                        </li>

                        <li class="nav-item" >
                            <a class="nav-link"  href="ConsultaTracking">Consulta Tracking</a>
                        </li>


                        <li class="nav-item" >
                        <a class="nav-link"  href="Departamentos">Cerrar Sesion</a>
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