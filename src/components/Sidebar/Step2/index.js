import React, { useEffect, useState, useRef } from 'react';
import './styles.scss';
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';
import { useAppContext } from '../../../contexts/AppContext';
import ImageLoader from '../../ImageLoader';

function Step2() {

  const [enviromentSelected, setEnviromentSelected] = useState(null);
  const [enviroments, setEnviroments] = useState([]);
  const store = useAppContext();
  const [loading, setLoading] = useState(false);
  const loadMoreButtonRef = useRef(null); // Ref al botón "Cargar más"

  useEffect(()=>{
    if(store.data) {
      let setssAux = store.data.sets.map((item)=>(
        {
          title:item.post_title,
          images:[item.wooden, item.black],
          type:[...item.types.split(",")],
          colors:[
            {color:"#ca6",price:item.wood_price},
            {color:"#000",price:item.black_price}
          ],
          coordinates: item.positions,
          ...item
        }
      ));
      if(store.set) {
        setEnviromentSelected(store.set);
      }
      setEnviroments(setssAux);
    }
  },[store.data]);

  const handleEnviroment = (env) => {
    setEnviromentSelected(env);
    store.setSet(env);
    store.setPaints([]);
    store.setEndStep(2)
  };

  const nextSetsPage = (page) => {
    setLoading(true);
    fetch(`${store.baseAPI}/sets?page=${store.setsPage+1}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(newData => {
      store.setSetsPage(prev=>(prev+1));
      store.setData({
        ...store.data,
        sets: [...store.data.sets, ...newData.data],
        setsMeta: newData
      });
      setLoading(false);
    })
    .catch(error => {
      setLoading(false);
      console.error('Hubo un problema con la solicitud fetch:', error);
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          nextSetsPage(); // Llama a nextSetsPage cuando el botón es visible
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
  }, [loading, store.setsPage]);

  return (
    <div className='sets-container'>
      {
        enviroments.map((enviroment, enviromentIndex)=>(
          <div className={'set-card '+((enviromentSelected && enviromentSelected.id===enviroment.id)?"enviroment-active":"")} key={enviromentIndex}>
            <div className='set-card-title'>
              {enviroment.title}
            </div>
            <div className='set-card-content'>
              <div className='image-color-list-container'>
                <ul className='image-color-list'>
                  {
                    enviroment.colors.map((item, index) => (
                      <li 
                        className=''
                        onClick={()=>handleEnviroment({...enviroment, indexSelected: index})}
                        key={index}
                      >
                        <div 
                          className={"image-color "+((enviromentSelected && index===enviromentSelected.indexSelected && (enviromentSelected.id===enviroment.id))?"image-color-active":"")}
                          style={{backgroundColor: item.color}} 
                        >
                        </div>
                        <span className='item-price'>{`${item.price}`}</span>
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className='img-wrapper' onClick={()=>handleEnviroment({...enviroment, indexSelected: 0})}>
                <div className='check'>
                  <CheckCircleSharpIcon/>
                </div>
                <ImageLoader src={enviroment.images[!enviromentSelected?0:((enviromentSelected.id===enviroment.id)?enviromentSelected.indexSelected:0)]} alt="" className="set-image"/>
                <img src={store.enviroment.images[store.enviroment.indexSelected]} alt=""/>
              </div>
            </div>

          </div>
        ))
      }
      
      {store.data && (store.data.setsMeta.total_pages > store.setsPage) &&
        <h3 ref={loadMoreButtonRef} onClick={nextSetsPage} className='loadMore' disabled={loading}>
          {loading ? 'Cargando...' : 'Cargar más'}
        </h3>
      }
    </div>
  );
}

export default Step2;
