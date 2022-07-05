import React from "react";
import { ResponsiveContainer } from "recharts";
import TablaCasos  from "../Casos/TablaCasos";
import CrearCaso  from "../Casos/CrearCaso";

function Caso(){

    return(
        <div className="top__card">
            <div className="container_top">
                <div className="container_text">
                    <h3 id="titulo" >Casos departamento</h3>
                </div>
                <div className="container_button">
       <CrearCaso/>
      </div>
            </div>
            <br/>
            <ResponsiveContainer width="70%" height="70%" id="ResponsiveContainer">
                <div className="container_table">
                <TablaCasos origin={true}/>
                </div>
            </ResponsiveContainer>
        </div>
    )  
}

export default Caso;