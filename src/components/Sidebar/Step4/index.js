import React from 'react';
import { useAppContext } from '../../../contexts/AppContext';
import './styles.scss';

function Step1() {

  // const store = useAppContext();

  // console.log(store);

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className='end-step-sidebar'>
      <div className=''>
        <h2 className='recoleta'>
          FELICITACIONES!
        </h2>
        <p>
          Estás a un paso de convertir tu casa en la casa de tus sueños
        </p>
        <div className='steps-to-finish'>
          <h3>CÓMO SEGUIMOS?</h3>
          <ol className='myriadregular'>
            <li><span>Descargá tu set</span></li>
            <li><span>Ingresá a la tienda y hacé la compra del mismo set que diseñaste</span></li>
            <li><span>Envianos el archivo que descargaste al final de tu composición por email o whatsapp</span></li>
            <li><span>Listo! Ya comenzamos a preparar tus cuadros</span></li>
          </ol>  
        </div>
        <a href='https://www.unmetrocuadrado.com.ar/set-de-cuadros/cuadros-eleccion/' target="_blank">VOLVER A LA TIENDA ONLINE PARA TERMINAR LA COMPRA</a>
        <button className="btn-warm" onClick={handleDownload}>DESCARGAR MI SET</button>
      </div>
    </div>
  );
}

export default Step1;
