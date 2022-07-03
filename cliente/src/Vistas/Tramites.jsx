import React from "react";
import { useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import Tramite from "../Componentes/Tramites/Tramite";

import { useState } from "react";


function Tramites(props) {

  const [showAlert, setShowAlert] = useState(false);

  const handleNameChange = (newName)=>{
    setShowAlert(newName);
  };

  return (
    <div className="metrics">
      <NavBar name = {<span className='nav-text'>Tramites </span>}/>
      <div className="grid-one">
      <Tramite nameChange={handleNameChange}/>
      </div>
    </div>
  );
}

export default Tramites;