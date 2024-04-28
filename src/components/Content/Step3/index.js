// components/Step3.js
import React, { useEffect, useState } from 'react';
import './styles.scss'; 
import { useAppContext } from '../../../contexts/AppContext';
import ImageLoader from '../../ImageLoader';

const Step3 = () => {

  const [paintSelected, setPaintSelected] = useState(null);

  const store = useAppContext();

  const [coordinatesParm, setCoordinates] = useState([]);

  useEffect(() => {
      const coordinatesAux = store.set.coordinates.split("),("); 
      let aux = [];

      coordinatesAux.forEach((coordString, index) => {
        // Eliminar paréntesis sobrantes
        coordString = coordString.replace("(", "").replace(")", "");
        const coord = coordString.split(",");
        const top = parseFloat(coord[1])+"%";
        const left = parseFloat(coord[0])+"%";
        const width = (parseFloat(coord[2]) - parseFloat(coord[0]))+"%";
        const height = (parseFloat(coord[3]) - parseFloat(coord[1]))+"%";

        aux.push({top,left,width,height});
      });
      setCoordinates([...aux]);
  }, [store.set.coordinates, store.paints]);

  const handlePaint = (index) => {
    setPaintSelected(index);
    store.setPaintSelected(index);
  }

  const findPaint = (index) => {
    for(let i=0;i<store.paints.length;i++) {
      // console.log(store.paints[i],index)
      if(store.paints[i].paintIndex===index){
        return (store.paints[i]);
      }
    }
    return null;
  }

  const handleClearIndex = () => {
    setPaintSelected(null);
    store.setPaintSelected(null);
  }

  return (
    <div className="editor-container">
      {
        store.enviroment &&
        <img src={store.enviroment.images[store.enviroment.indexSelected]} alt="" onClick={handleClearIndex}/>
      }
      {
        coordinatesParm.map((item,index)=>{
          let paint = findPaint(index);
          return (
            <div className={"set-item "+((index===paintSelected)?"set-item-active":"")} style={{top: item.top, left: item.left, width: item.width, height: item.height}} key={index} onClick={()=>handlePaint(index)}>
              {
                findPaint(index)?
                <img className='painting' src={paint.img.src}/>
                :
                <></>
              }
            </div>
          )
        })
      }
      {
        store.set &&
        <img className='set' src={store.set.images[store.set.indexSelected]} alt=""/>
      }
    </div>
  );
};

export default Step3;
