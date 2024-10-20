// App.js
import React, { useEffect, useState, useRef } from 'react';
import { AppProvider } from './contexts/AppContext';
import Sidebar from './components/Sidebar';
import Content from './components/Content'; 
import './styles.scss';
import WelcomeView from './components/WelcomeView';

import videoFile from './assets/rotate-smartphone-to-portrait-5554091-4635011.mp4';

const baseAPI = 'https://simulador.unmetrocuadrado.com.ar/wp/wp-json/custom/v1/post-types';

function App() {

  const videoRef = useRef();

  const [data, setData] = useState(null);
  const [step, setStep] = useState(-1);
  const [landscape, setLandscape] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const urls = [
      `${baseAPI}/environments?page=1`,
      `${baseAPI}/sets?page=1`,
      `${baseAPI}/paintings?page=1`
    ]
    // call to API
    Promise.all(urls.map(url => fetch(url).then(res => res.json())))
    // .then(response => {
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }
    //   return response.json();
    // })
    .then(data => {
      console.log(data)
      setData({
        environments: data[0].data,
        sets: data[1].data,
        paintings: data[2].data,
        environmentsMeta: data[0],
        setsMeta: data[1],
        paintingsMeta: data[2],
      })
      // setData(data);
      setLoading(false)
    })
    .catch(error => {
      console.error('Hubo un problema con la solicitud fetch:', error);
    });

  },[]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.play(); 
    }
  }, [landscape]);

  useEffect(()=> {
    window.addEventListener("orientationchange", handleOrientationChange);
    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  },[]);

  useEffect(()=> {
    if (window.matchMedia("(orientation: portrait)").matches) {
      setLandscape(true);
    }
  },[])

  const handleOrientationChange = () => { 
    setLandscape(true)
    if (window.matchMedia("(orientation: portrait)").matches) {
      // console.log("Landscape")
      setLandscape(false);
    }
  }

  // const { setCurrentStep } = useAppContext(); 

  const handleStepChange = (step) => {
    setStep(step); 
  };

  return (
    <AppProvider>
      {
        landscape ? 
        <div className='landscape-messaje-container'>
          <video ref={videoRef} src={videoFile} autoPlay loop muted playsInline></video>
        </div>
        :
        <></>
      }
      {
        step!==-1 ?
        <div style={{ display: 'flex' }}>
          <Sidebar 
            onChangeStep={handleStepChange} 
            data={data}
            // nextEnvironmentsPage={(page)=>nextEnvironmentsPage(page)}
            // nextSetsPage={(page)=>nextSetsPage(page)}
            // nextPaintingsPage={(page)=>nextPaintingsPage(page)}
          /> 
          <Content />
        </div>
        :
        <WelcomeView
          onChangeStep={handleStepChange}
          loading={loading}
        />
      }
    </AppProvider>
  );
}

export default App;
