import React, { useEffect, useState } from 'react';
import './styles.scss';
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';
import { useAppContext } from '../../../contexts/AppContext';
import ImageLoader from '../../ImageLoader';

function Step1() {

  const [enviromentSelected, setEnviromentSelected] = useState(null);
  const store = useAppContext();
  const [enviroments, setEnviroments] = useState([]);

  // const enviroments = [
  //   {
  //     id:0,
  //     images:["https://simulador.unmetrocuadrado.com.ar/wp-content/uploads/2024/02/living1.jpg","https://simulador.unmetrocuadrado.com.ar/wp-content/uploads/2024/02/living2.jpg","https://simulador.unmetrocuadrado.com.ar/wp-content/uploads/2024/02/living3.jpg"],
  //     colors:["red","blue","orange"]
  //   },
  //   {
  //     id:1,
  //     images:["https://simulador.unmetrocuadrado.com.ar/wp-content/uploads/2024/02/cama3.jpg","https://simulador.unmetrocuadrado.com.ar/wp-content/uploads/2024/02/cama2.jpg","https://simulador.unmetrocuadrado.com.ar/wp-content/uploads/2024/02/cama1.jpg"],
  //     colors:["purple","yellow","green"]
  //   }
  // ]

  useEffect(()=>{
    if(store.data) {
      let enviromentsAux = store.data.environments.map((item)=>({colors: [item.bg_color_1,item.bg_color_2,item.bg_color_3],images:[item.bg1,item.bg2,item.bg3],...item}));
      // console.log(store.enviroment);
      if(store.enviroment) {
        setEnviromentSelected(store.enviroment);
      }
      setEnviroments(enviromentsAux);
    }
  },[store.data])

  const handleEnviroment = (env) => {
    setEnviromentSelected(env);
    store.setEnviroment(env);
    // console.log(env)
  }

  return (
    <>
      {
        enviroments.map((enviroment, enviromentIndex)=>(
          <div className={'enviroment-card '+((enviromentSelected && enviromentSelected.id===enviroment.id)?"enviroment-active":"")} key={enviromentIndex}>
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
    </>
  );
}

export default Step1;
