import React, { useState, useEffect, } from 'react';
import { PhotoService } from '../AppContext/PhotoService';
import { Galleria } from 'primereact/galleria';
import "../css/estilos.css";
import NavBar from './NavBar';
export function GalleriaIndicatorDemo () {

    const [images, setImages] = useState(null);

    const galleriaService = new PhotoService();

    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    useEffect(() => {
        galleriaService.getImages().then(data => {setImages(data)})
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const itemTemplate = (item) => {
        return <img src={item.itemImageSrc} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={item.alt} style={{ width: '100%', display: 'block' }} />;
    }
    //console.log(images)
    return (
        <>
        <NavBar /> 
      
            <div className="galleria-demo">
               
                    <h1 id='titulo'>Bienvenidos al sistema </h1>
                    <h2 id='titulo1'> de </h2>
                    <h2 id='titulo1'> DOCUMENT TRACKING </h2>
                    <Galleria id='Galeri' value={images} responsiveOptions={responsiveOptions} numVisible={5} style={{ maxWidth: '1024px', position: 'center', minheight:'1024px', minwidth: '1024px',opacity: '0.65', }} 
                        showThumbnails={false}  changeItemOnIndicatorHover item={itemTemplate} circular autoPlay transitionInterval={5000}/>
               
            </div>
       
        </>
    );
}