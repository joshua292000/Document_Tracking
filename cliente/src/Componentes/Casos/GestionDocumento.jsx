import React from "react";
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";
import TablaDocumentoSubido from "./TablaDocumentoSubido";

function SubirDoc(props){

    const { id, nombre } = props;

    return(
    <div className="top__card">
      <div className="container_top">
      <div className="container_text">
      <h3 id="txtCaso" >{nombre} documentos</h3>
      </div>

      <div className="container_button">
      </div>
      </div>
      <ResponsiveContainer width="70%" height="70%" id="ResponsiveContainer">
         <div className="container_table">
         <TablaDocumentoSubido id_c={id}/>
         </div>
      </ResponsiveContainer>
    </div>
    );
}
export default SubirDoc;