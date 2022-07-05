import React from "react";
import { useLocation } from 'react-router-dom';
import NavBar from "./NavBar.js";
import SubirDoc from "../Componentes/Casos/GestionDocumento.jsx";
import { useState } from "react";


function SubirDocum(props) {

  const [showAlert, setShowAlert] = useState(false);

  const handleNameChange = (newName)=>{
    setShowAlert(newName);
  };

  const location = useLocation();

  const data = location.state;

  return (
    <div className="metrics">
      <NavBar name = {<div><span className='nav-text' style={{cursor: "pointer"}} onClick={ () => {window.history.back()}}>Casos {'>'} </span>
      <span className='nav-text' style={{cursor: "pointer"}} >Gestionar</span>
      </div>}/>
      <div className="grid-one">
      <SubirDoc id={data.myData.id_cons} nombre={data.myData.nombre} />
      </div>
    </div>
  );
}

export default SubirDocum;