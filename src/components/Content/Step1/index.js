import React from 'react';
import { useAppContext } from '../../../contexts/AppContext';
import './styles.scss';
import ImageLoader from '../../ImageLoader';

function Step1() {

  const store = useAppContext();

  return (
    <div className='enviroment-images-container'>
      {
        store.enviroment &&
        <ImageLoader src={store.enviroment.images[store.enviroment.indexSelected]} alt=""/>
      }
    </div>
  );
}

export default Step1;
