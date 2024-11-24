import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAppContext } from '../../../contexts/AppContext';
import './styles.scss';
import ImageLoader from '../../ImageLoader';

import { useScreenshot, createFileName } from 'use-react-screenshot';

function Step1() {
  const [paintSelected, setPaintSelected] = useState(null);
  const [loading, setLoading] = useState(true);

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
      setTimeout(()=>{
        setLoading(false)
      }, 2000);
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

  const [image, takeScreenShot] = useScreenshot()
  const download = (image, { name = "img", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const downloadScreenshot = () => takeScreenShot(ref.current).then(download);

  useEffect(()=>{
    if(!loading)
      downloadScreenshot();
    // console.log(store.downloadTrigger)
  },[store.downloadTrigger])

  useEffect(()=>{
    if(store.endStep<3)
      store.setEndStep(3)
  },[])

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
                  <img className='painting' src={paint.img.image}/>
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
      <div style={{display: 'flex', alignItems: 'center'}}>
        ELEGISTE: {store.set.title} con marco {store.set.type[store.set.indexSelected]} 
        <button className='btn-warm' style={{marginLeft: '1rem'}} onClick={()=>{window.open(store.set.url.url,'_blank');}}>COMPRAR SET</button>
      </div>
    </div>
  );
};

export default Step1;
