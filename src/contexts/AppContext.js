// contexts/AppContext.js
import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [enviroment, setEnviroment] = useState(null);
  const [set, setSet] = useState(null);
  const [paints, setPaints] = useState([]);
  const [paintSelected, setPaintSelected] = useState(0);
  const [data, setData] = useState(null);
  const [downloadTrigger, setDownloadTrigger] = useState(false);
  const [loading, setLoading] = useState(true);
  const baseAPI = 'https://simulador.unmetrocuadrado.com.ar/wp/wp-json/custom/v1/post-types';
  const [enviromentsPage, setEnviromentsPage] = useState(1);
  const [setsPage, setSetsPage] = useState(1);
  const [paintingsPage, setPaintingsPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [steps, setSteps] = useState({
    step1: true,
    step2: true,
    step3: true,
    step4: true,
  }); 
  const [endStep, setEndStep] = useState(0);

  const reset = () => {
    // setData(null)
    setCurrentStep(0);
    setEnviroment(null);
    setSet(null);
    setPaints([]);
    setPaintSelected(0);
    setEndStep(0);
  }

  const value = {
    data,
    setData,
    currentStep,
    setCurrentStep,
    enviroment,
    setEnviroment,
    set,
    setSet,
    paints,
    setPaints,
    paintSelected,
    setPaintSelected,
    reset,
    setDownloadTrigger,
    downloadTrigger,
    setLoading,
    loading,
    baseAPI,
    enviromentsPage,
    setEnviromentsPage,
    setsPage,
    setSetsPage,
    paintingsPage,
    setPaintingsPage,
    categories, 
    setCategories,
    steps, 
    setSteps,
    endStep,
    setEndStep
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
