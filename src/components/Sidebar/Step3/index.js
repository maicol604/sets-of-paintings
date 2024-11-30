import React, { useEffect, useState, useRef } from 'react';
import Grid from '@mui/material/Grid';
import './styles.scss';
import { useAppContext } from '../../../contexts/AppContext';
import ImageLoader from '../../ImageLoader';
import Heart from '../../Heart';

function Step3() {

  const store = useAppContext();
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [option, setOption] = useState(0);
  const [loading, setLoading] = useState(false);
  const loadMoreButtonRef = useRef(null); // Ref para el botón "Cargar más"
  const [paintsByCategory, setPaintsByCategory] = useState([]);
  const [paintsByCategoryPage, setPaintsByCategoryPage] = useState(1);
  const [paintsByCategoryData, setPaintsByCategoryData] = useState(null);

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
          categories: [],
          ...item
        }
      ));
      if(store.paints) {
        setImages(store.paints)
      }
      if(store.categories){
        setCategories(store.categories.slice(0, -1))
      }
      setImages(imagesAux);
    }
  },[store.data]);

  const handlePaint = (img) => {
    if(store.paintSelected !== null) {
      const existingPaintIndex = store.paints.findIndex(paint => paint.paintIndex === store.paintSelected);
      if (existingPaintIndex !== -1) {
        const updatedPaints = [...store.paints];
        updatedPaints[existingPaintIndex] = { img, paintIndex: store.paintSelected };
        store.setPaints(updatedPaints);
      } else {
        store.setPaints([...store.paints, { img, paintIndex: store.paintSelected }]);
      }
    }
  };
  
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
    setFavorites(f);
    localStorage.setItem('favorites', JSON.stringify(f));
  }

  const handleFavorites = (paint) => {
    manageFavorite(paint.id);
  };

  const isFavorite = (id) => {
    return favorites.includes(id);
  };

  const nextPaintingsPage = () => {
    setLoading(true);
    fetch(`${store.baseAPI}/paintings?page=${store.paintingsPage+1}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(newData => {
      store.setPaintingsPage(prev => (prev + 1));
      store.setData({
        ...store.data,
        paintings: [...store.data.paintings, ...newData.data],
        paintingsMeta: newData
      });
      setLoading(false);
    })
    .catch(error => {
      console.error('Hubo un problema con la solicitud fetch:', error);
      setLoading(false);
    });
  };

  const getPaintsByCategory = (category, page) => {
    setLoading(true);
    let aux = [];
    let url =`${store.baseAPI}/paintings?page=${page}&category=${category}`;
    if(page>1) {
      aux = [...paintsByCategory];
    }
    if(category==='CATEGORIAS') {
      url = `${store.baseAPI}/paintings?page=1`;
    }

    fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(newData => {
      const newPaints = [...aux, ...newData.data];
      setPaintsByCategory(newPaints);
      setPaintsByCategoryPage(prev => (prev+1));
      setLoading(false);
      setPaintsByCategoryData(newData);
    })
    .catch(error => {
      console.error('Hubo un problema con la solicitud fetch:', error);
      setLoading(false);
    });
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          if(option!==2)
            nextPaintingsPage(); // Llama a nextPaintingsPage cuando el botón es visible
          else
            getPaintsByCategory(selectedOption, paintsByCategoryPage)
        }
      },
      { threshold: 1.0 } // Se dispara cuando el botón es completamente visible
    );

    if (loadMoreButtonRef.current) {
      observer.observe(loadMoreButtonRef.current);
    }

    return () => {
      if (loadMoreButtonRef.current) {
        observer.unobserve(loadMoreButtonRef.current);
      }
    };
  }, [loading, store.paintingsPage]);

  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setPaintsByCategory([]);
    setPaintsByCategoryPage(0);
    getPaintsByCategory(value, 1)
    setSelectedOption(value);
    setOption(2);
  };

  return (
    <div className='paint-list-container'>
      <div className='paints-header'>
        <div onClick={() => setOption(0)}>TODOS</div>
        <div onClick={() => setOption(1)}>FAVORITOS {`(${favorites.length})`}</div>
        <div>
            {/* <label id="dropdown-label">CATEGORÍAS</label> */}
            <select
              value={selectedOption}
              onChange={handleChange}
              className='category-select'
            >
              <option value={null}>CATEGORIAS</option>
              {
                categories.map((item)=>{
                  return (
                    <option value={item.slug} key={item.id}>{item.name.toUpperCase()}</option>
                  )
                })
              }
            </select>
        </div>
      </div>
      <Grid container spacing={2}>
        {
          option === 0 
          &&
          <>
            {images.map((image, index) => (
              <Grid item xs={4} key={index}>
                <div className='paint-wrapper'>
                  <span className='favorites-container' onClick={() => handleFavorites(image)}>
                    <Heart active={isFavorite(image.id)} />
                  </span>
                  <ImageLoader className='img-list-item' src={image.image} alt="" onClick={() => handlePaint(image)} />
                </div>
              </Grid>
            ))}
          </>
        }
        {
          option === 1 
          &&
          <>
            {images.map((image, index) => (
              isFavorite(image.id) ?
              <Grid item xs={4} key={index}>
                <div className='paint-wrapper'>
                  <span className='favorites-container' onClick={() => handleFavorites(image)}>
                    <Heart active={isFavorite(image.id)} />
                  </span>
                  <ImageLoader className='img-list-item' src={image.image} alt="" onClick={() => handlePaint(image)} />
                </div>
              </Grid>
              : null
            ))}
          </>
        }
        {
          option === 2
          &&
          <>
            {paintsByCategory.map((image, index) => (
              <Grid item xs={4} key={index}>
                <div className='paint-wrapper'>
                  <span className='favorites-container' onClick={() => handleFavorites(image)}>
                    <Heart active={isFavorite(image.id)} />
                  </span>
                  <ImageLoader className='img-list-item' src={image.image} alt="" onClick={() => handlePaint(image)} />
                </div>
              </Grid>
            ))}
          </>
        }
      </Grid>
      {option!==2 &&
      store.data && (store.data.paintingsMeta.total_pages >= store.paintingsPage) &&
        <h3 ref={loadMoreButtonRef} onClick={nextPaintingsPage} className='loadMore' disabled={loading}>
          {loading ? 'Cargando...' : 'Cargar más'}
        </h3>
      }
      {option===2 &&
        paintsByCategoryData && (paintsByCategoryData.total_pages >= paintsByCategoryPage) &&
        <h3 ref={loadMoreButtonRef} onClick={()=>{if(paintsByCategoryPage>0)getPaintsByCategory(selectedOption, paintsByCategoryPage)}} className='loadMore' disabled={loading}>
          {loading ? 'Cargando...' : 'Cargar más'}
        </h3>
      }
      {option===2 &&
        !paintsByCategoryData &&
        <h3 className='loadMore' disabled={loading}>
          Cargando...
        </h3>
      }
    </div>
  );
}

export default Step3;
