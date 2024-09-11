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

  const reset = () => {
    // setData(null)
    setCurrentStep(0);
    setEnviroment(null);
    setSet(null);
    setPaints([]);
    setPaintSelected(0);
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
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
