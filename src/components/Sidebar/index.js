// components/Sidebar.js
import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { useAppContext } from '../../contexts/AppContext';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import './styles.scss';
import logo from '../../assets/logo.png';

const Sidebar = (props) => {
  
  const steps = [
    "Seleccionar un entorno",
    "Elegir un set de cuadros",
    "Seleccionar los diseños",
    "Descargar el diseño del set de cuadros"
  ];


  const { currentStep } = useAppContext();
  const { setCurrentStep } = useAppContext();
  const store = useAppContext();
  const [setNumber, setSetNumber] = useState(1000);

  useEffect(()=>{
    if(props.data){
      store.setData(props.data);
    }
  },[props.data])
  useEffect(()=>{
    if(store.set){
      setSetNumber(parseInt(store.set.items_count));
      // console.log(store.paints,parseInt(store.set.items_count),store.paints.length);
    }
  },[store.set])
  const renderStepContent = () => {
    switch (currentStep) {
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

  const handleNext = () => {
    if(currentStep<4){
      let nextStep = currentStep+1;
      props.onChangeStep(nextStep);
      setCurrentStep(nextStep);
    }
  }

  const handlePrev = () => {
    if(currentStep>0){
      let nextStep = currentStep-1;
      props.onChangeStep(nextStep);
      setCurrentStep(nextStep);
    }
  }

  return (
    <div className='sidebar-container'>
      <div className='sidebar-header'>
        <div 
          className='logo-container cursor-pointer' 
          onClick={()=>{
            props.onChangeStep(-1); 
            setCurrentStep(0);
            store.reset();
          }}
        >
          <img src={logo} alt="Logo"/>
        </div>
      </div>
      <div>
          {renderStepContent()}
      </div>
      <div className='step-control'>
        {
        (currentStep===0) ?
        <button className='btn-primary' onClick={handleNext} disabled={(store.enviroment===null)}>
          Siguiente
        </button>
        :
        <></>
        }
        {
        (currentStep===1) ?
        <button className='btn-primary' onClick={handleNext} disabled={(store.set===null)}>
          Siguiente
        </button>
        :
        <></>
        }
        {
        (currentStep===2) ?
        <button className='btn-primary' onClick={handleNext} disabled={!(`${(setNumber)}`===`${(store.paints.length)}`)}>
          Siguiente
        </button>
        :
        <></>
        }
        {currentStep>0 &&
          <button className=' btn-secondary' onClick={handlePrev}>
            Atrás
          </button>
        }
      </div>
    </div>
  );
};

export default Sidebar;
