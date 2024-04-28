import React, { useEffect, useState } from 'react';
import './styles.scss';
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';
import { useAppContext } from '../../../contexts/AppContext';
import ImageLoader from '../../ImageLoader';

function Step2() {

  const [enviromentSelected, setEnviromentSelected] = useState(null);
  const [enviroments, setEnviroments] = useState([]);
  const store = useAppContext();

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
      // console.log(setssAux);
      // console.log(store.set)
      if(store.set) {
        setEnviromentSelected(store.set);
      }
      setEnviroments(setssAux);
    }
  },[store.data])

  const handleEnviroment = (env) => {
    setEnviromentSelected(env);
    store.setSet(env);
    store.setPaints([]);
  }

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
                        <span className='item-price'>{item.price + "$"}</span>
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
    </div>
  );
}

export default Step2;
