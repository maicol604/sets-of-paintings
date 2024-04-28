import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAppContext } from '../../../contexts/AppContext';
import './styles.scss';
import ImageLoader from '../../ImageLoader';

function Step1() {
  const [paintSelected, setPaintSelected] = useState(null);

  const store = useAppContext();

  const [coordinatesParm, setCoordinates] = useState([]);

  const ref = useRef(null);

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
  },[]);

  const findPaint = (index) => {
    for(let i=0;i<store.paints.length;i++) {
      // console.log(store.paints[i],index)
      if(store.paints[i].paintIndex===index){
        return (store.paints[i]);
      }
    }
    return null;
  }

  return (
    <div className="final-image-container">
      <div ref={ref} className='print-section' id="print-section">
        {
          store.enviroment &&
          <img src={store.enviroment.images[store.enviroment.indexSelected]} alt="" />
        }
        {
          coordinatesParm.map((item,index)=>{
            let paint = findPaint(index);
            return (
              <div className={"set-item "+((index===paintSelected)?"set-item-active":"")} style={{top: item.top, left: item.left, width: item.width, height: item.height}} key={index}>
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
      <div style={{display: 'flex', flexDirection:'column'}}>
        ELEGISTE: {store.set.title} con marco {store.set.type[store.set.indexSelected]}
      </div>
    </div>
  );
};

export default Step1;
