import { BrowserRouter, Route, Routes } from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";  
import React from 'react';
import {Logig} from "./Vistas/Logig";
//import {InfoDepartamento} from "./Vistas/Departamentos";
import { IngresarEmpleado } from "./Vistas/Empleados";
import {InfoUsuarios} from "./Vistas/Usuarios";
import {InfoOrganizacion} from "./Vistas/Organizacion";
import {InfoCuenta} from "./Vistas/NuevaContra";
import Tramites from "./Vistas/Tramites";
import EditarTramite from "./Vistas/EditarTramites";
import EditarDocumento from "./Vistas/EditarDocumento";
import EditarCiclo from "./Vistas/EditarCiclo";
import {GalleriaIndicatorDemo} from "./Vistas/Inicio";
import Departamentos from "./Vistas/Departamentos";
import EditarDepartamento from "./Vistas/EditarDepartamento";
import Casos from "./Vistas/Casos";
import SubirDocum from "./Vistas/SubirDocumentos";
import "./App.css";


export function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Logig/>}/>
      
          <Route path="/Usuarios" element={<InfoUsuarios/>}/>
          <Route path="/Organizacion" element={<InfoOrganizacion/>}/>
          <Route path="/Cuenta" element={<InfoCuenta/>}/>
          <Route path="/Empleados" element={<IngresarEmpleado/>}/>
          <Route path="/Tramites" element={<Tramites/>}/>
          <Route path="/EditarTramites" element={<EditarTramite/>}/>
          <Route path="/EditarDocumento" element={<EditarDocumento/>}/>
          <Route path="/EditarCiclo" element={<EditarCiclo/>}/>
          <Route path="/Inicio" element={<GalleriaIndicatorDemo/>}/>
          <Route path="/Departamentos" element={<Departamentos/>}/>
          <Route path="/EditarDepartamento" element={<EditarDepartamento/>}/>
          <Route path="/Casos" element={<Casos/>}/>
          <Route path="/SubirDocumentos" element={<SubirDocum/>}/>
      </Routes>
    </BrowserRouter>
  );
}

