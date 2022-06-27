import React, { useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import {useNavigate} from "react-router-dom";
export function TabMenuDemo(){

    const [activeIndex, setActiveIndex] = useState(0);
    const navegar = useNavigate();
    const link = ()=>{
        console.log("Hola mUndo");
        navegar("/Departamentos");
        
    }
    const items = [
        {label: 'Home', icon: 'pi pi-fw pi-home', onclick:{link}},
        {label: 'Calendar', icon: 'pi pi-fw pi-calendar'},
        {label: 'Edit', icon: 'pi pi-fw pi-pencil'},
        {label: 'Documentation', icon: 'pi pi-fw pi-file'},
        {label: 'Settings', icon: 'pi pi-fw pi-cog'}
    ];
    return (
        <div>
            <div className="card">
                <h5>Default</h5>
                <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index) }/>
            </div>
        </div>
       
    );
}