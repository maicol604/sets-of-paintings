// components/Content.js
import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import Grid from '@mui/material/Grid';
import Step1 from './Step1'; 
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import './styles.scss';

import greenEnviroment from '../../assets/entorno_verde.png';
import blackEnviroment from '../../assets/entorno_negro.png';
import greenSet from '../../assets/sets_verde.png';
import blackSet from '../../assets/sets_negro.png';
import greenPaint from '../../assets/imagen_verde.png';
import blackPaint from '../../assets/imagen_negro.png';
import greenDownload from '../../assets/descarga_verde.png';
import blackDownload from '../../assets/descarga_negro.png';


const Content = () => {
  const store = useAppContext();

  const renderStepContent = () => {
    switch (store.currentStep) {
      case 0:
        return <Step1 />;
      case 1:
        return <Step2 />;
      case 2:
        return <Step3 />;
      case 3:
        return <Step4 />;
      default:
        return null;
    }
  };

  return (
    <div className='content-wrapper'>
      <div className='counter-list'>
        <div className={'counter-item '+(store.currentStep===0?"counter-item-active":"")}>
          <div className='counter-item-icon'>
            {
              store.currentStep===0 ?
              <img src={greenEnviroment} alt=""/>
              :
              <img src={blackEnviroment} alt=""/>
            }
          </div>
          <div className='content'>
            <div>1</div>
            <p>Elegir</p>
            <p>entorno</p>
          </div>
        </div>  
        <div className={'counter-item '+(store.currentStep===1?"counter-item-active":"")}>
          <div className='counter-item-icon'>
            {
              store.currentStep===1 ?
              <img src={greenSet} alt=""/>
              :
              <img src={blackSet} alt=""/>
            }
          </div>
          <div className='content'>
            <div>2</div>
            <p>Elegir set</p>
            <p>de cuadros</p>
          </div>
        </div>  
        <div className={'counter-item '+(store.currentStep===2?"counter-item-active":"")}>
          <div className='counter-item-icon'>
            {
              store.currentStep===2 ?
              <img src={greenPaint} alt=""/>
              :
              <img src={blackPaint} alt=""/>
            }
          </div>
          <div className='content'>
            <div>3</div>
            <p>Elegir</p>
            <p>diseños</p>
          </div>
        </div>  
        <div className={'counter-item '+(store.currentStep===3?"counter-item-active":"")}>
          <div className='counter-item-icon'>
            {
              store.currentStep===3 ?
              <img src={greenDownload} alt=""/>
              :
              <img src={blackDownload} alt=""/>
            }
          </div>
          <div className='content'>
            <div>4</div>
            <p>descargar</p>
            <p>mi set</p>
          </div>
        </div>  
      </div>
      <div className='h-90vh center-center overflow-hidden'>
        {renderStepContent()}
      </div>
    </div>
  );
};

export default Content;
