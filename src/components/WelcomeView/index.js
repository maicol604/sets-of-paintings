import React from "react";
import './styles.scss';
import logo from '../../assets/logo.png';
import Grid from '@mui/material/Grid';

import blackEnviroment from '../../assets/entorno_negro.png';
import blackSet from '../../assets/sets_negro.png';
import blackPaint from '../../assets/imagen_negro.png';
import blackDownload from '../../assets/descarga_negro.png';

import bg from '../../assets/bg-welcome.jpg';
import Loader from "../Loader";

const WelcomeView = (props) => {

    const handleClick = () => {
        props.onChangeStep(0);
    }

    return (
        <div className="welcome-view-container">
            <div className="sidebar">
                <div className='sidebar-header'>
                    <div className='logo-container'>
                        <img src={logo} alt="Logo"/>
                    </div>
                </div>
                <div className="content">
                    <div className={'counter-item '}>
                        <div className='counter-item-icon'>
                            {
                            <img src={blackEnviroment} alt=""/>
                            }
                        </div>
                        <div className='content'>
                            <div>1</div>
                            <p>Elegir</p>
                            <p>entorno</p>
                        </div>
                    </div>  
                    <div className={'counter-item '}>
                        <div className='counter-item-icon'>
                            {
                            <img src={blackSet} alt=""/>
                            }
                        </div>
                        <div className='content'>
                            <div>2</div>
                            <p>Elegir set</p>
                            <p>de cuadros</p>
                        </div>
                    </div>  
                    <div className={'counter-item '}>
                        <div className='counter-item-icon'>
                            {
                            <img src={blackPaint} alt=""/>
                            }
                        </div>
                        <div className='content'>
                            <div>3</div>
                            <p>Elegir</p>
                            <p>diseños</p>
                        </div>
                    </div>  
                    <div className={'counter-item '}>
                        <div className='counter-item-icon'>
                            {
                            <img src={blackDownload} alt=""/>
                            }
                        </div>
                        <div className='content'>
                            <div>4</div>
                            <p>descargar</p>
                            <p>mi set</p>
                        </div>
                    </div> 
                </div>
            </div>
            <div className='content-wrapper'>
                <div className='counter-list'> 
                    <h2>SIMULADOR DE CUADROS: Crea tu propio set!</h2>
                </div>
                <div className="content-container" style={{backgroundImage:`url(${bg})`, backgroundSize:'cover', backgroundPosition:'center'}}>
                    <div className="banner">
                        <div className="title-square">
                            PASO A PASO
                        </div>
                        <div className="title-cursive">
                            Crea el set de tus sueños!
                        </div>
                        <div className="text">
                            Sigue las instrucciones para crear tu set, eligiendo primero la cantidad de cuadros y medidas que se adapten a tus espacios y luego los diseños que más te gusten.
                        </div>
                        {props.loading 
                        ? 
                        <div><span className="loader"></span></div>
                        :
                        <button className="main-action-btn" onClick={handleClick} disabled={props.loading}>
                            EMPEZAR
                        </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WelcomeView;