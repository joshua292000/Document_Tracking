import React from "react";

import NavBar from "./NavBar.js";
import Caso from "../Componentes/Casos/Caso";

function Casos() {
  
  return (
    <div className="metrics">
      <NavBar name = {<span className='nav-text'>Casos </span>}/>
      <div className="grid-one">
        <Caso/>
      </div>
    </div>
  );
}

export default Casos;