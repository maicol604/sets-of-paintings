import React from 'react';
import { useAppContext } from '../../../contexts/AppContext';
import './styles.scss';
import ImageLoader from '../../ImageLoader';

function Step2() {

  const store = useAppContext();

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
