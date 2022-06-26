
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";  
import React from 'react';
import {Logig} from "./Vistas/Logig";
import {InfoDepartamento} from "./Vistas/Departamentos";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Logig/>}/>
          <Route path="/Departamentos" element={<InfoDepartamento/>}/>
      </Routes>
    </BrowserRouter>
  );
}

