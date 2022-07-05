import React from "react";
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";
import TableU from "./TablaDepartamentos";
import CrearDepartamento from './CrearDepartamento';
//import {Table} from "react-bootstrap";


function Departamento(props) {

  const { nameChange } = props;

  const mostrarSms = (newName)=>{
    nameChange(newName);
  };

  return (
    <div className="top__card">
      <div className="container_top">
      <div className="container_text">
      <h3 id="titulo" >Departamentos registrados</h3>
      <br/>
      </div>

      <div className="container_button">
       <CrearDepartamento mostrar={mostrarSms}/>
      </div>
      <br/>
      </div>
      <ResponsiveContainer width="70%" height="70%" id="ResponsiveContainer">
         <div className="container_table">
         <TableU/>
         </div>
      </ResponsiveContainer>
    </div>
  );
}

export default Departamento;
