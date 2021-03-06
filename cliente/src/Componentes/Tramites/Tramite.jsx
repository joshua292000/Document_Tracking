import React from "react";
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";
import TablaTramite from "./TablaTramite";
import CrearTramite from "./CrearTramite";

function Tramite(props){

    const { nameChange } = props;

    const mostrarSms = (newName)=>{
        nameChange(newName);
    };


    return(
    <div className="top__card">
      <div className="container_top">
      <div className="container_text">
      <h3 id="titulo">Tramites registrados</h3>
      </div>

      <div className="container_button">
      <CrearTramite mostrar={mostrarSms}/>
      </div>
      <br/>
      <br/>
      </div>
      <ResponsiveContainer width="70%" height="70%" id="ResponsiveContainer">
         <div className="container_table">
         <TablaTramite/>
         </div>
      </ResponsiveContainer>
    </div>
    );
}
export default Tramite;