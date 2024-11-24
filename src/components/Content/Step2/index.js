import React, { useEffect } from 'react';
import { useAppContext } from '../../../contexts/AppContext';
import './styles.scss';
import ImageLoader from '../../ImageLoader';

function Step2() {

  const store = useAppContext();

  useEffect(()=>{
    if(store.endStep<1)
      store.setEndStep(1)
  },[])

  return (
    <div className='enviroment-set'>
      {
        store.enviroment &&
        <img src={store.enviroment.images[store.enviroment.indexSelected]} alt=""/>
      }
      {
        store.set &&
        <ImageLoader src={store.set.images[store.set.indexSelected]} alt=""/>
      }
    </div>
  );
}

export default Step2;
