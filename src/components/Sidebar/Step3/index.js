import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import './styles.scss';
import { useAppContext } from '../../../contexts/AppContext';
import ImageLoader from '../../ImageLoader';

function Step1() {

  const store = useAppContext();
  const [images, setImages] = useState([]);

  useEffect(()=>{
    if(store.data) {
      let imagesAux = store.data.paintings.map((item)=>(
        {
          src: item.image,
          categories: [

          ],
          ...item
        }
      ));
      //  console.log(store.paints);
      if(store.paints) {
        setImages(store.paints)
      }
      setImages(imagesAux);
    }
  },[store.data])

  const handlePaint = (img) => {
    if(store.paintSelected!==null) {
      const existingPaintIndex = store.paints.findIndex(paint => paint.paintIndex === store.paintSelected);
      if (existingPaintIndex !== -1) {
        const updatedPaints = [...store.paints];
        updatedPaints[existingPaintIndex] = { img, paintIndex: store.paintSelected };
        store.setPaints(updatedPaints);
      } else {
        store.setPaints([...store.paints, { img, paintIndex: store.paintSelected }]);
      }
    }
    // console.log(store.paints.length)
  }
  

  return (
    <div className='paint-list-container'>
      <Grid container spacing={2}>
        {
          images.map((image, index)=>(
            <Grid item xs={4} key={index}>
              <ImageLoader className='img-list-item' src={image.src} alt="" onClick={()=>handlePaint(image)}/>
            </Grid>
          ))
        }
      </Grid>
    </div>
  );
}

export default Step1;
