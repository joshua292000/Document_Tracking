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
                        <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="Departamentos" role="button" data-bs-toggle="dropdown">Departamentos</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Crear departamento</a></li>
                            <li><a class="dropdown-item" href="#">Editar departamento</a></li>
                            <li><a class="dropdown-item" href="#">Eliminar departamento</a></li>
                        </ul>
                        </li>

                        <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="Documentos" role="button" data-bs-toggle="dropdown">Documentos</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Crear documento</a></li>
                            <li><a class="dropdown-item" href="#">Editar documento</a></li>
                            <li><a class="dropdown-item" href="#">Eliminar documento</a></li>
                        </ul>
                        </li>

                        <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="Empleados" role="button" data-bs-toggle="dropdown">Empleados</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Crear empleado</a></li>
                            <li><a class="dropdown-item" href="#">Editar empleado</a></li>
                            <li><a class="dropdown-item" href="#">Eliminar empleado</a></li>
                        </ul>
                        </li>

                        <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="Tramites" role="button" data-bs-toggle="dropdown">Tramites</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Crear tramite</a></li>
                            <li><a class="dropdown-item" href="#">Editar tramite</a></li>
                            <li><a class="dropdown-item" href="#">Eliminar tramite</a></li>
                        </ul>
                        </li>

                        <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="Casos" role="button" data-bs-toggle="dropdown">Casos</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Crear caso</a></li>
                            <li><a class="dropdown-item" href="#">Editar caso</a></li>
                            <li><a class="dropdown-item" href="#">Eliminar caso</a></li>
                        </ul>
                        </li>
               
                        

                        <li class="nav-item" >
                        <a class="nav-link"  href="CerrarSesion">Cerrar Sesion</a>
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