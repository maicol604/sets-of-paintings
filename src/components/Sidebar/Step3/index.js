import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import './styles.scss';
import { useAppContext } from '../../../contexts/AppContext';
import ImageLoader from '../../ImageLoader';
import Heart from '../../Heart';

function Step1() {

  const store = useAppContext();
  const [images, setImages] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [option, setOption] = useState(0);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);

    const handleStorageChange = (event) => {
      if (event.key === 'favorites') {
        const updatedFavorites = JSON.parse(event.newValue);
        setFavorites(updatedFavorites || []); 
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

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
  }
  
  function manageFavorite(id) {
    let f = JSON.parse(localStorage.getItem('favorites'));
    if (!f) {
        f = [id];
    } else {
        const index = f.indexOf(id);
        
        if (index === -1) {
            f.push(id);
        } else {
            f.splice(index, 1);
        }
    }
    setFavorites(f)
    localStorage.setItem('favorites', JSON.stringify(f));
  }

  const handleFavorites = (paint) => {
    manageFavorite(paint.id);
  }

  const isFavorite = (id) => {
    return favorites.includes(id);
  };

  return (
    <div className='paint-list-container'>
      <div className='paints-header'>
        <div onClick={()=>setOption(0)}>TODOS</div>
        <div onClick={()=>setOption(1)}>FAVORITOS {`(${favorites.length})`}</div>
        <div>CATEGORÍAS</div>
      </div>
      <Grid container spacing={2}>
        {
          option===0 
          ?
          images.map((image, index)=>(
            <Grid item xs={4} key={index}>
              <div className='paint-wrapper'>
                <span className='favorites-container' onClick={()=>handleFavorites(image)}><Heart active={isFavorite(image.id)}/></span>
                <ImageLoader className='img-list-item' src={image.src} alt="" onClick={()=>handlePaint(image)}/>
              </div>
            </Grid>
          ))
          :
          images.map((image, index)=>(
            isFavorite(image.id) ?
            <Grid item xs={4} key={index}>
              <div className='paint-wrapper'>
                <span className='favorites-container' onClick={()=>handleFavorites(image)}><Heart active={isFavorite(image.id)}/></span>
                <ImageLoader className='img-list-item' src={image.src} alt="" onClick={()=>handlePaint(image)}/>
              </div>
            </Grid>
            :
            <></>
          ))
        }
      </Grid>
    </div>
  );
}

export default Step1;
