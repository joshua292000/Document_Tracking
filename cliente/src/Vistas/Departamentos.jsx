import React from "react";
import NavBar from "./NavBar.js";
import Departamento from "../Componentes/Departamento/Departamento";
import { Alert } from 'antd';
import { useState } from "react";

function Departamentos() {

const [showAlert, setShowAlert] = useState(false);

const handleNameChange = (newName)=>{
  setShowAlert(newName);
};

  return (
    <div className="metrics">
      <NavBar name = {<span className='nav-text'>Departamentos </span>}/>
      <div className="grid-one">
        <Departamento nameChange={handleNameChange}/>
      </div>
    </div>
  );
}

export default Departamentos;