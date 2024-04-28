// App.js
import React, { useEffect, useState } from 'react';
import { AppProvider } from './contexts/AppContext';
import Sidebar from './components/Sidebar';
import Content from './components/Content'; 
import './styles.scss';
import WelcomeView from './components/WelcomeView';

function App() {

  const [data, setData] = useState(null);
  const [step, setStep] = useState(-1);

  useEffect(()=>{
    // console.log("get data")
    fetch('https://simulador.unmetrocuadrado.com.ar/wp/wp-json/custom/v1/post-types')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setData(data);
    })
    .catch(error => {
      console.error('Hubo un problema con la solicitud fetch:', error);
    });

  },[])

  // const { setCurrentStep } = useAppContext(); 

  const handleStepChange = (step) => {
    setStep(step); 
  };

  return (
    <AppProvider>
      {
        step!==-1 ?
        <div style={{ display: 'flex' }}>
          <Sidebar onChangeStep={handleStepChange} data={data}/> 
          <Content />
        </div>
        :
        <WelcomeView
          onChangeStep={handleStepChange}
        />
      }
    </AppProvider>
  );
}

export default App;
