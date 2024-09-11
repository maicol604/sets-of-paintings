import React, { useEffect, useState } from 'react';
import './styles.scss';
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';
import { useAppContext } from '../../../contexts/AppContext';
import ImageLoader from '../../ImageLoader';

function Step1() {

  const [enviromentSelected, setEnviromentSelected] = useState(null);
  const store = useAppContext();
  const [enviroments, setEnviroments] = useState([]);

  useEffect(()=>{
    if(store.data) {
      let enviromentsAux = store.data.environments.map((item)=>({colors: [item.bg_color_1,item.bg_color_2,item.bg_color_3],images:[item.bg1,item.bg2,item.bg3],...item}));
      // console.log(store.enviroment);
      if(store.enviroment) {
        setEnviromentSelected(store.enviroment);
      } else {
        handleEnviroment({...enviromentsAux[0], indexSelected: 0})
      }
      setEnviroments([...enviromentsAux]);
    }
  },[store.data])

  const handleEnviroment = (env) => {
    setEnviromentSelected(env);
    store.setEnviroment(env);
    // console.log(env)
  }

  return (
    <div className='env-container'>
      {
        enviroments.map((enviroment, enviromentIndex)=>(
          <div className={'enviroment-card '+((enviromentSelected && enviromentSelected.id===enviroment.id)?"enviroment-active":"")} key={enviromentIndex+"-env"}>
            <div className='image-color-list-container'>
              <ul className='image-color-list'>
                {
                  enviroment.colors.map((item, index) => (
                    <li 
                      className={"image-color "+((enviromentSelected && index===enviromentSelected.indexSelected && (enviromentSelected.id===enviroment.id))?"image-color-active":"")} 
                      style={{backgroundColor: item}} 
                      onClick={()=>handleEnviroment({...enviroment, indexSelected: index})}
                      key={index}
                    ></li>
                  ))
                }
              </ul>
            </div>
            <div className='img-wrapper' onClick={()=>handleEnviroment({...enviroment, indexSelected: 0})}>
              <div className='check'>
                <CheckCircleSharpIcon/>
              </div>
              <ImageLoader src={enviroment.images[!enviromentSelected?0:((enviromentSelected.id===enviroment.id)?enviromentSelected.indexSelected:0)]} alt=""/>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default Step1;
